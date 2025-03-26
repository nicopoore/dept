import { Launch } from "types";
import { ReactComponent as Star } from "assets/images/star.svg";
import "./index.scss";

interface LaunchCardProps {
  launch: Launch;
  updateFavorite: Function;
}

const Skeleton: React.FC = () => (
  <div className="launch-card launch-card-skeleton">
    <div className="patch skeleton-patch" />
    <div className="content">
      <div className="skeleton-title" />
      <div className="skeleton-details" />
      <div className="skeleton-date" />
    </div>
  </div>
);

const LaunchCard = ({ launch, updateFavorite }: LaunchCardProps) => {
  return (
    <div className="launch-card">
      <div
        className="patch"
        style={{ backgroundImage: `url(${launch.mission_patch})` }}
      />
      <div className="content">
        <h3>{launch.mission_name}</h3>
        {launch.details ? (
          <span className="details">{launch.details}</span>
        ) : null}
        <div className="card-footer">
          <span className="date">
            {new Date(launch.launch_date_unix).toDateString()}
          </span>
          <Star
            onClick={() => updateFavorite(launch.favorite, launch.flight_number)}
            className={launch.favorite ? "active" : ""}
          />
        </div>
      </div>
    </div>
  );
};

LaunchCard.Skeleton = Skeleton;

export { LaunchCard };
