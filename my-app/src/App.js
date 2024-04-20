import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Form, Dropdown, Card, Button } from "react-bootstrap";
import "./styles.css";
import PikachuImage from "./Images/pikachu.png";
import CharmanderImage from "./Images/charmendar.png";
import BulbasaurImage from "./Images/balbasaur.png";
import SquirtleImage from "./Images/squirtle.png";
import LandingQuizPage from "./LandingQuizPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import pokeBall from "./Images/PokeBall.jpg";

function ButtonComponent() {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate("/landing")} style={{background:'transparent',borderColor:'transparent'}}>
      <img src={pokeBall} alt="pokeball" className="imageStyle" />
    </Button>
  );
}

function App() {
  //states to be maintained
  const [moves, setMoves] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState("");
  const [selectedItem, setSelectedItem] = useState("Select a Pokemon");
  const [selectedImage, setSelectedImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (pokemon) => {
    setSelectedPokemon(pokemon);
    setSelectedItem(pokemon.charAt(0).toUpperCase() + pokemon.slice(1));

    switch (pokemon) {
      case "pikachu":
        setSelectedImage(PikachuImage);
        break;
      case "bulbasaur":
        setSelectedImage(BulbasaurImage);
        break;
      case "squirtle":
        setSelectedImage(SquirtleImage);
        break;
      case "charmander":
        setSelectedImage(CharmanderImage);
        break;
      default:
        setSelectedImage("");
    }
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then((response) => response.json())
      .then((data) => setMoves(data.moves.slice(0, 10)));
  };

  return (
    <div className="poke4">

    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div
            className="justify-content-center align-items-center p-5"
            style={{
              backgroundImage: `url(${selectedImage})`,
              backgroundSize: "contain",
              animation: "spin 5s linear infinite",
              height: "220vh",
            }}
            >
              <div>
                <Form className="m-1">
                  <Form.Label
                    style={{
                      color: selectedItem === "squirtle" ? "white" : "initial",
                    }}
                    className="cartoon-text"
                    >
                    Pokemon Name
                  </Form.Label>
                </Form>
              </div>
              <div>
                <Dropdown
                  onSelect={handleSelect}
                  autoClose
                  onToggle={(isOpen) => setIsOpen(isOpen)}
                  >
                  <Dropdown.Toggle>{selectedItem}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="pikachu">Pikachu</Dropdown.Item>
                    <Dropdown.Item eventKey="bulbasaur">
                      Bulbasaur
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="squirtle">Squirtle</Dropdown.Item>
                    <Dropdown.Item eventKey="charmander">
                      Charmander
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              {moves.length > 0 && (
                <Card
                className={`shadow p-3 mb-5 bg-white rounded card-dimen ${
                  isOpen ? "animate" : ""
                }`}
                >
                  {moves.map((move, index) => (
                    <ul
                    key={index}
                    className={`move ${selectedPokemon}`}
                    style={{ cursor: "pointer" }}
                    >
                      <li>
                        {move.move.name.charAt(0).toUpperCase() +
                          move.move.name.slice(1)}
                      </li>
                    </ul>
                  ))}
                </Card>
              )}
              <ButtonComponent />
            </div>
          }
          />
        <Route path="/landing" element={<LandingQuizPage />} />
      </Routes>
    </Router>
          </div>
  );
}

export default App;
