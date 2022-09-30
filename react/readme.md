# Dept® FS Coding Exercise

We are gonna build an awesome spaceX app where the user should be able to see a list of launches and mark them as favorites and search them for their names.
For this exercise we are gonna start building a node REST API and connect it with a REACT APP, both codebases are already built but have some gaps for you to add some functionality.

## Node

We need to have a NodeJs REST API to serve some SpaceX launches data and let a user mark their favorites.

1. Launches list.
   We need to fetch data from SpaceX endpoints below, and build an array of launches that looks like this

```json
{
  "flight_number": 39,
  "mission_name": "NROL-76",
  "mission_patch": "https://images2.imgbox.com/be/e7/iNqsqVYM_o.png",
  "details": "Residual stage 1 thrust led to collision between stage 1 and stage 2",
  "rocket": {
    "rocket_id": "falcon9",
    "rocket_name": "Falcon 9",
    "active": true,
    "cost_per_launch": 6700000,
    "company": "SpaceX"
  }
}
```
