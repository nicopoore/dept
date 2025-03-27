import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLaunchByFlightNumber } from "api/launches";
import { Launch } from "types";
import { ReactComponent as Star } from "assets/images/star.svg";
import { ReactComponent as ChevronLeftIcon } from "assets/images/chevron-left.svg";
import { addFavorite, removeFavorite } from "api/favorites";
import { useLocalStorage } from "hooks";
import "./index.scss";
import { useAuth } from "hooks/useAuth";

export const FlightDetails = () => {
  const { flightNumber } = useParams<{ flightNumber: string }>();
  const [launch, setLaunch] = useState<Launch | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toggleFavorite } = useLocalStorage();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchLaunchDetails = async () => {
      if (!flightNumber) {
        console.error("No flight number provided");
        setIsLoading(false);
        return;
      }
      setIsLoading(true);

      if (isAuthenticated) {
        try {
          const flightNumberInt = parseInt(flightNumber);
          if (isNaN(flightNumberInt)) {
            console.error("Invalid flight number:", flightNumber);
            setIsLoading(false);
            return;
          }

          const data = await getLaunchByFlightNumber(flightNumberInt);
          setLaunch(data);
        } catch (error) {
          console.error("Error fetching launch details:", error);
        } finally {
          setIsLoading(false);
        }
      };
    }

    fetchLaunchDetails();
  }, [flightNumber, isAuthenticated]);

  const handleUpdateFavorite = async () => {
    if (!launch) return;

    const newFavoriteStatus = !launch.favorite;
    toggleFavorite(launch.flight_number);

    setLaunch(prev => prev ? { ...prev, favorite: newFavoriteStatus } : null);

    try {
      await (launch.favorite
        ? removeFavorite(launch.flight_number)
        : addFavorite(launch.flight_number));
    } catch (error) {
      console.error("Failed to update favorite status:", error);

      // Rollback optimistic update
      toggleFavorite(launch.flight_number);
      setLaunch(prev => prev ? { ...prev, favorite: !newFavoriteStatus } : null);
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="flight-details-container loading">
        <div className="loading-spinner"></div>
        <p>Loading mission data...</p>
      </div>
    );
  }

  if (!launch) {
    return (
      <div className="flight-details-container error">
        <div className="error-icon">!</div>
        <p>Mission data not found</p>
        <button className="back-link" onClick={handleGoBack}>
          Return to missions
        </button>
      </div>
    );
  }

  const launchDate = new Date(launch.launch_date_unix * 1000);
  const formattedDate = launchDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const formattedTime = launchDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="flight-details-container">
      <div className="flight-details-header">
        <button className="back-button" onClick={handleGoBack}>
          <ChevronLeftIcon />
          <span>Back to launches</span>
        </button>
        <div className="header-right">
          <Star
            onClick={handleUpdateFavorite}
            className={`favorite-star ${launch.favorite ? "active" : ""}`}
          />
        </div>
      </div>

      <div className="mission-title-banner">
        <h1>{launch.mission_name}</h1>
        <div className="mission-metadata">
          <span className="flight-number">Flight #{launch.flight_number}</span>
          <span className="launch-date">{formattedDate}</span>
        </div>
      </div>

      <div className="flight-details-content">
        <div className="mission-patch">
          <img sizes="(max-width: 600px) 100vw, 300px" src={launch.mission_patch} alt={`${launch.mission_name} patch`} />
        </div>

        <div className="flight-info">
          <div className="info-section">
            <h2>Mission Overview</h2>
            {launch.details ? (
              <p className="mission-details">{launch.details}</p>
            ) : (
              <p className="mission-details no-details">No mission details available</p>
            )}
          </div>

          <div className="info-section">
            <h2>Flight Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">Flight Number</span>
                <span className="value">{launch.flight_number}</span>
              </div>
              <div className="info-item">
                <span className="label">Launch Date</span>
                <span className="value">{formattedDate}</span>
              </div>
              <div className="info-item">
                <span className="label">Launch Time</span>
                <span className="value">{formattedTime}</span>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h2>Rocket Details</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">Name</span>
                <span className="value">{launch.rocket.rocket_name}</span>
              </div>
              <div className="info-item">
                <span className="label">Company</span>
                <span className="value">{launch.rocket.company}</span>
              </div>
              <div className="info-item">
                <span className="label">Status</span>
                <span className="value status">
                  {launch.rocket.active ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="info-item">
                <span className="label">Cost Per Launch</span>
                <span className="value">${launch.rocket.cost_per_launch.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 