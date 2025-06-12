from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
from predict_utils import predict, parameters, X_mean, X_std

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"] for stricter control
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the expected input structure
class Passenger(BaseModel):
    Pclass: int
    Sex: int      # 0 for female, 1 for male (as you encoded)
    Age: float
    Family:int
    Fare: float

@app.get("/")
def home():
    return {"message": "Titanic Survival Prediction API"}

@app.post("/predict/")
def predict_survival(passenger: Passenger):
    # Convert input to numpy array (shape: [features, 1])
    x = np.array([
    passenger.Fare,
    passenger.Sex,
    passenger.Age,
    passenger.Pclass,
    passenger.Family
]).reshape(-1, 1)  # shape (5,1)

    # Normalize input using saved mean and std
    x_norm = (x - X_mean.reshape(-1,1)) / X_std.reshape(-1,1)


    # Predict
    y_pred = predict(parameters, x_norm)

    return {"survived": int(y_pred[0][0])}
