import { useEffect, useContext, useState } from "react";
import { ModeContext } from "contexts/ModeContext";
import { Launch } from "types";
import { LaunchCard, Search, Pagination, CARDS_PER_PAGE } from "components";
import { getLaunches } from "../../api";
import "./index.scss";
import { useDebounce, useLocalStorage } from "hooks";
import { addFavorite, removeFavorite } from "api/favorites";
import { useAuth } from "hooks/useAuth";

export const LaunchesList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [filteredLaunches, setFilteredLaunches] = useState<Launch[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce(searchText, 100);

  const { isAuthenticated } = useAuth();
  const { showAll } = useContext(ModeContext);

  const { toggleFavorite } = useLocalStorage();

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
    const loadLaunches = async () => {
      setIsLoading(true);
      try {
        if (isAuthenticated) {
          const launches = await getLaunches();
          setLaunches(launches);
        }
      } catch (error) {
        console.error({ error });
      } finally {
        setIsLoading(false);
      }
    };

    loadLaunches();
  }, [isAuthenticated]);

  useEffect(() => {
    setCurrentPage(1);
    return setFilteredLaunches(
      launches.filter((l: Launch) => {
        const matchesSearchText = debouncedSearchText === "" ||
          (l.mission_name && l.mission_name.toLowerCase().includes(debouncedSearchText.toLowerCase()));

        return (showAll || l.favorite) && matchesSearchText;
      })
    );
  }, [debouncedSearchText, showAll, launches]);

  return (
    <div className="launches-list-container">
      <div className="launches-list-container-header">
        <p className="launches-list-container-header-total">
          {isLoading ? 'Loading...' : `Total (${launches.length})`}
        </p>
        <Search value={searchText} onChange={setSearchText} />
      </div>
      <div className="launches-list">
        {isLoading ? Array(CARDS_PER_PAGE).fill(0).map((_, index) => (
          <LaunchCard.Skeleton key={`skeleton-${index}`} />
        )) : (
          filteredLaunches
            .slice(
              CARDS_PER_PAGE * (currentPage - 1),
              CARDS_PER_PAGE * currentPage
            )
            .map((launch, i) => (
              <LaunchCard
                key={`${launch.flight_number}-${launch.launch_date_unix}`}
                launch={launch}
                updateFavorite={handleUpdateFavorite}
              />
            ))
        )}
      </div>
      {!isLoading && (
        <Pagination
          value={currentPage}
          onChange={setCurrentPage}
          itemsCount={filteredLaunches.length}
        />
      )}
    </div>
  );
};
