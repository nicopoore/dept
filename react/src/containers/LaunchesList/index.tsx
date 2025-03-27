import { useEffect, useContext, useState, useCallback } from "react";
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
  const [cardsPerPage, setCardsPerPage] = useState<number>(CARDS_PER_PAGE);

  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce(searchText, 100);

  const { isAuthenticated } = useAuth();
  const { showAll } = useContext(ModeContext);

  const { toggleFavorite } = useLocalStorage();

  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    if (width < 992) {
      setCardsPerPage(6);
    } else {
      setCardsPerPage(CARDS_PER_PAGE);
    }
  }, []);

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

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
        const hasDetails = l.details !== null && l.mission_patch !== null;

        return (showAll || l.favorite) && matchesSearchText && hasDetails;
      })
    );
  }, [debouncedSearchText, showAll, launches]);

  return (
    <div className="launches-list-container">
      <div className="launches-list-container-header">
        <Search value={searchText} onChange={setSearchText} />
        <p className="launches-list-container-header-total">
          {isLoading ? 'Loading...' : `Total (${filteredLaunches.length})`}
        </p>
      </div>
      <div className="launches-list">
        {isLoading ? Array(cardsPerPage).fill(0).map((_, index) => (
          <LaunchCard.Skeleton key={`skeleton-${index}`} />
        )) : (
          filteredLaunches
            .sort((a, b) => b.launch_date_unix - a.launch_date_unix)
            .map((launch, i) => {
              if (i >= cardsPerPage * (currentPage - 1) && i < currentPage * cardsPerPage) {
                return (
                  <LaunchCard
                    key={`${launch.flight_number}-${launch.launch_date_unix}`}
                    launch={launch}
                    updateFavorite={handleUpdateFavorite}
                  />
                )
              }
              return null
            })
        )}
      </div>
      <div className="launches-list-container-footer">
        {!isLoading && (
          <Pagination
            value={currentPage}
            onChange={setCurrentPage}
            itemsCount={filteredLaunches.length}
            itemsPerPage={cardsPerPage}
          />
        )}
      </div>
    </div>
  );
};
