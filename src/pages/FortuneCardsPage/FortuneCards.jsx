import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../FortuneCardsPage/FortuneCards.css"; 

export const FortuneCard = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fal mesajları
  const fortuneMessages = [
    "Bugün çok şanslısınız! İstediğiniz her şey yolunda gidecek.",
    "Yeni bir başlangıç yapmak için mükemmel bir gün.",
    "Enerjiniz yüksek, projelerinizde başarılı olacaksınız.",
    "Bugün beklenmedik bir iyilikle karşılaşacaksınız.",
    "Sevdiğiniz insanlarla güzel vakit geçireceksiniz.",
    "Yaratıcılığınız zirvede, yeni fikirler üreteceksiniz.",
    "Finansal açıdan şanslı bir döneme giriyorsunuz.",
    "Sağlığınıza dikkat ederseniz uzun ve mutlu bir yaşam süreceksiniz.",
    "Aşk hayatınızda pozitif gelişmeler olacak.",
    "Kariyerinizde önemli bir adım atacaksınız."
  ];

  useEffect(() => {
    const fetchRandomPokemons = async () => {
      try {
        // Önce tüm pokemonları çekelim
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=124`);
        const data = await response.json();
        
        // Rastgele 10 pokemon seç
        const shuffled = [...data.results].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 10);
        
        // Seçilen pokemonların detaylarını al
        const pokemonsWithDetails = await Promise.all(
          selected.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return await res.json();
          })
        );
        
        setPokemons(pokemonsWithDetails);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pokemons:", error);
        setLoading(false);
      }
    };

    fetchRandomPokemons();
  }, []);

  const handleCardClick = (pokemon, index) => {
    setSelectedPokemon({
      ...pokemon,
      fortune: fortuneMessages[index]
    });
  };

  const handleGoToDetail = () => {
    if (selectedPokemon) {
      navigate(`/${selectedPokemon.id}`);
    }
  };

  if (loading) {
    return <div className="loading">Kartlar yükleniyor...</div>;
  }

  if (selectedPokemon) {
    return (
      <div className="fortune-result">
        <img 
          src={selectedPokemon.sprites.other.dream_world.front_default || selectedPokemon.sprites.front_default} 
          alt={selectedPokemon.name}
          className="fortune-pokemon-image"
        />
        <h2>{selectedPokemon.name.toUpperCase()} kartını seçtiniz!</h2>
        <p className="fortune-message">{selectedPokemon.fortune}</p>
        
        <div className="fortune-buttons">
          <button 
            onClick={() => setSelectedPokemon(null)}
            className="fortune-button"
          >
            Yeniden Dene
          </button>
          <button 
            onClick={handleGoToDetail}
            className="fortune-button secondary"
          >
            Pokémon Detayını Gör
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fortune-container">
      <h1>Pokémon Falı</h1>
      <p>Bir kart seçin ve şansınızı öğrenin!</p>
      
      <div className="fortune-cards">
        {pokemons.map((pokemon, index) => (
          <div 
            key={pokemon.id}
            className="fortune-card"
            onClick={() => handleCardClick(pokemon, index)}
          >
            <div className="card-back">?</div>
          </div>
        ))}
      </div>
    </div>
  );
};