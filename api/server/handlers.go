package server

import (
    "net/http"
    "strconv"
)

func (a *app) GetStatus(w http.ResponseWriter, r *http.Request){
    status := map[string]string{
        "damaged_system" : "life_support",
    }
    writeJSON(w, http.StatusOK, status)
}

func (a *app) Teapot(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusTeapot)
}

func (a *app) GetIndex(w http.ResponseWriter, r *http.Request) {
    http.ServeFile(w, r, "index.html")
}

//p1: {x1 : 0.00105, y1: 0.05}
//p2: {x2 : 0.0035, y2: 10}
//p3: {x3 : 30, y3: 0.05}

// pendientes:
// m1 = (y2 - y1) / (x2 - x1)
// m2 = (y3 - y2) / (x3 - x2)

// ecuacion punto pendiente:
// y - y2 = m1 * (x - x2) => x = (y - y2) / m1 + x2
// y - y2 = m2 * (x - x2) => x = (y - y2) / m2 + x2

type Point struct {
    X float64 `json:"x"`
    Y float64 `json:"y"`
}

var p1 = Point{X: 0.00105, Y: 0.05}
var p2 = Point{X: 0.0035, Y: 10.0}
var p3 = Point{X: 30.0, Y: 0.05}

var m1 = (p2.Y - p1.Y) / (p2.X - p1.X)
var m2 = (p3.Y - p2.Y) / (p3.X - p2.X)

func (a *app) GetSpecificVolumes(w http.ResponseWriter, r *http.Request) {
    pathPressure  := r.URL.Query().Get("pressure")

    //convert to float
    pressure, err := strconv.ParseFloat(pathPressure, 64)

    if err != nil {
        http.Error(w, "Invalid pressure value", http.StatusBadRequest)
        return  
    }
    waterVolume := (pressure - p2.Y) / m1 + p2.X
    steamVolume := (pressure - p2.Y) / m2 + p2.X

    response := map[string]float64{
        "specific_volume_liquid": waterVolume,
        "specific_volume_vapor": steamVolume,
    }

    if err := writeJSON(w, http.StatusOK, response); err != nil {
        http.Error(w, "Internal Server Error", http.StatusInternalServerError)
    }
}
