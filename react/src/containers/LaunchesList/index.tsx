import { useEffect, useContext, useState } from "react";
import { ModeContext } from "contexts/ModeContext";
import { Launch } from "types";
import { LaunchCard, Search, Pagination, CARDS_PER_PAGE } from "components";
import { getLaunches } from "../../api";
import "./index.scss";
import { useLocalStorage } from "hooks";
import { addFavorite, removeFavorite } from "api/favorites";

export const LaunchesList = () => {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [filteredLaunches, setFilteredLaunches] = useState<Launch[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const { showAll } = useContext(ModeContext);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { toggleFavorite } = useLocalStorage();

  const filterLaunches = () => {
    setCurrentPage(1);
    return setFilteredLaunches(
      launches.filter((l: Launch) => {
        const matchesSearchText = searchText === "" ||
          (l.mission_name && l.mission_name.toLowerCase().includes(searchText.toLowerCase()));

        return (showAll || l.favorite) && matchesSearchText;
      })
    );
  };

  const loadLaunches = async () => {
    try {
      const launches = await getLaunches();
      setLaunches(launches);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateFavorite = async (isFavorite: boolean, flightNumber: number) => {
    toggleFavorite(flightNumber);
    setLaunches(prevLaunches =>
      prevLaunches.map(launch =>
        launch.flight_number === flightNumber
          ? { ...launch, favorite: !launch.favorite }
          : launch
      )
    );

    try {
      await (isFavorite
        ? removeFavorite(flightNumber)
        : addFavorite(flightNumber));
    } catch (error) {
      console.error("Failed to update favorite status:", error);

      // Rollback optimistic ui update
      toggleFavorite(flightNumber);
      setLaunches(prevLaunches =>
        prevLaunches.map(launch =>
          launch.flight_number === flightNumber
            ? { ...launch, favorite: isFavorite }
            : launch
        )
      );
    }
  };

  useEffect(() => {
    loadLaunches();
  }, []);

  useEffect(filterLaunches, [searchText, showAll, launches]);

  return (
    <div className="launches-list-container">
      <div className="launches-list-container-header">
        <p>Total ({launches.length})</p>
        <Search value={searchText} onChange={setSearchText} />
      </div>
      <div className="launches-list">
        {filteredLaunches
          .filter(
            (_: Launch, i: number) =>
              i >= CARDS_PER_PAGE * (currentPage - 1) &&
              i < CARDS_PER_PAGE * currentPage
          )
          .map((launch, i) => (
            <LaunchCard
              key={launch.flight_number}
              launch={launch}
              updateFavorite={handleUpdateFavorite}
            />
          ))}
      </div>
      <Pagination
        value={currentPage}
        onChange={setCurrentPage}
        itemsCount={filteredLaunches.length}
      />
    </div>
  );
};
