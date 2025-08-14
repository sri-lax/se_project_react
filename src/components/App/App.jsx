import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import Profile from "../Profile/Profile";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { register, authorize, checkToken, updateUser } from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "../../Contexts/CurrentUserContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 0 }, // both units for future rendering
    city: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginError, setLoginError] = useState("");

  const handleRegister = (formData) => {
    register(formData)
      .then(() => {
        setIsRegisterOpen(false);
        return authorize({
          email: formData.email,
          password: formData.password,
        });
      })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return checkToken(res.token);
      })
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
      })
      .catch(console.error);
  };

  const handleLogin = (formData) => {
    authorize(formData)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return checkToken(res.token);
      })
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
        setIsLoginOpen(false);
        setLoginError("");
      })
      .catch((err) => {
        console.error("Login failed:", err);
        setLoginError(err); // ✅ Show error in modal
      });
  };
  const handleEditProfileClick = () => setIsEditModalOpen(true);
  const closeEditProfileModal = () => setIsEditModalOpen(false);

  const handleEditProfileSubmit = (formData) => {
    const token = localStorage.getItem("jwt");
    updateUser(formData, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeEditProfileModal();
      })
      .catch((err) => {
        console.error("Profile update failed:", err);
        setLoginError("Invalid email or password.");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((user) => {
          setIsLoggedIn(true);
          setCurrentUser(user);
        })
        .catch(() => localStorage.removeItem("jwt"));
    }
  }, []);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  // 🧩 Modal logic
  const handleCardClick = (card) => {
    console.log("Card clicked:", card);

    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleConfirmDelete = () => {
    deleteItem(selectedCard._id).then(() => {
      setClothingItems((prevItems) =>
        prevItems.filter((item) => item._id !== selectedCard._id)
      );
      setIsConfirmModalOpen(false);
      closeActiveModal();
    });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const request = !isLiked ? addCardLike(id) : removeCardLike(id);

    request
      .then((res) => {
        const updatedCard = res;
        console.log("Updated card:", updatedCard);

        setClothingItems((cards) =>
          cards.map((item) =>
            item._id === updatedCard._id ? updatedCard : item
          )
        );
      })
      .catch((err) => console.log(err));
  };

  const handleCancelDelete = () => setIsConfirmModalOpen(false);

  const handleAddClick = () => setActiveModal("add-garment");

  const handleDeleteClick = () => setIsConfirmModalOpen(true);

  const closeActiveModal = () => {
    setActiveModal("");
    setSelectedCard(null); //  Clear the selected card
    setIsConfirmModalOpen(false); // Optional: reset confirmation modal too
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    console.log("Submitting item:", { name, imageUrl, weather });

    addItem({ name, imageUrl, weather })
      .then((newItem) => {
        console.log("Item added:", newItem);
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to add item:", error);
        // Optional: show feedback to user
      });
  };

  // ⌨️ Close modal with Esc key
  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [activeModal]);

  // 🌦️ Fetch weather
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filtered = filterWeatherData(data);
        setWeatherData(filtered);
      })
      .catch(console.error);
  }, []);

  // 👕 Fetch clothing items
  useEffect(() => {
    getItems()
      .then((response) => {
        console.table(response.data);
        const items = Array.isArray(response?.data)
          ? response.data.reverse()
          : [];
        console.log("Processed items:", items);
        setClothingItems(items);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{
          currentTemperatureUnit,
          setCurrentTemperatureUnit,
          handleToggleSwitchChange,
        }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              onLogin={() => setIsLoginOpen(true)}
              onRegister={() => setIsRegisterOpen(true)}
              onLogout={handleLogout}
              currentUser={currentUser}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onAddClick={handleAddClick}
                      currentUser={currentUser}
                      onLogout={handleLogout}
                      onEditProfileClick={handleEditProfileClick}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <RegisterModal
              isOpen={isRegisterOpen}
              onClose={() => setIsRegisterOpen(false)}
              onRegister={handleRegister}
            />

            <LoginModal
              isOpen={isLoginOpen}
              onClose={() => {
                setIsLoginOpen(false);
                setLoginError(""); // Clear error when closing modal
              }}
              onLogin={handleLogin}
              loginError={loginError} // Pass error message
              setLoginError={setLoginError}
            />
          </div>

          <AddItemModal
            activeModal={activeModal}
            onClose={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          />

          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteClick={handleDeleteClick}
            isConfirmModalOpen={isConfirmModalOpen}
          />

          <ConfirmationModal
            isOpen={isConfirmModalOpen}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />

          <EditProfileModal
            isOpen={isEditModalOpen}
            onClose={closeEditProfileModal}
            activeModal="editProfile"
            currentUser={currentUser}
            onEditProfileSubmit={handleEditProfileSubmit}
          />

          <Footer />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
