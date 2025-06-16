import React from "react";
import "../styles/MessageBubble.scss";

const MessageBubble = ({ message }) => {
  const { sender, type, content, pluginName, pluginData } = message;

  const renderText = () => content;

  // Handle Error Messages
  const renderError = () => (
    <div className="plugin-card error-card">
      <strong>Error:</strong> {pluginData.error}
    </div>
  );

  // Handle Calc plugin output
  const renderCalc = () => (
    <div className="plugin-card calc-card">
      <div>
        <strong>Expression:</strong> {pluginData.expression}
      </div>
      <div>
        <strong>Result:</strong> {pluginData.result}
      </div>
    </div>
  );

  // Handle Weather Plugin Output
  const renderWeather = () => {
    const { location, temperature, condition, windspeed, humidity, time } =
      pluginData;

    return (
      <div className="plugin-card weather-card">
        <div>
          <strong>📍 Location:</strong> {location}
        </div>
        <div>
          <strong>🌡️ Temperature:</strong> {temperature}
        </div>
        <div>
          <strong>🌤️ Condition:</strong> {condition}
        </div>
        <div>
          <strong>💧 Humidity:</strong> {humidity}
        </div>
        <div>
          <strong>💨 Wind:</strong> {windspeed}
        </div>
        <div>
          <strong>🕒 Time:</strong> {time}
        </div>
      </div>
    );
  };

  // Handle Define Plugin Output
  const renderDefine = () => {
    const { word, phonetic, definitions } = pluginData;

    return (
      <div className="plugin-card define-card">
        <div>
          <strong>📚 Word:</strong> {word} {phonetic && `/${phonetic}/`}
        </div>
        {definitions.map((def, i) => (
          <div key={i}>
            <strong>
              {i + 1}. ({def.partOfSpeech})
            </strong>{" "}
            {def.definition}
            {def.example && (
              <div style={{ fontStyle: "italic" }}>"{def.example}"</div>
            )}
          </div>
        ))}
      </div>
    );
  };

  //Render Portfolio Command Output
  const renderPortfolio = () => {
    const breakdown = pluginData?.pluginData?.breakdown;
    const total = pluginData?.pluginData?.total;

    if (!Array.isArray(breakdown)) {
      return (
        <div className="plugin-card error-card">⚠️ No holdings found.</div>
      );
    }

    return (
      <div className="plugin-card portfolio-card">
        {breakdown.map((coin) => (
          <div key={coin.symbol} className="coin-row">
            <img src={coin.logo} alt={coin.symbol} className="coin-logo" />
            <div className="coin-details">
              <strong>{coin.symbol}</strong> ({coin.name})<br />
              {coin.amount} × ${coin.price} = <strong>${coin.value}</strong>
            </div>
          </div>
        ))}
        <div className="portfolio-total">
          💰 <strong>Total:</strong> ${total}
        </div>
      </div>
    );
  };

  // Render Plugin Output to Chat Window
  const renderPlugin = () => {
    if (!pluginData) return null;
    if (pluginData.error) return renderError();

    switch (pluginName) {
      case "calc":
        return renderCalc();
      case "weather":
        return renderWeather();
      case "define":
        return renderDefine();
      case "portfolio":
        return renderPortfolio();
      default:
        return (
          <div className="plugin-card">
            {JSON.stringify(pluginData, null, 2)}
          </div>
        );
    }
  };

  const renderContent = () => {
    if (type === "text") return renderText();
    if (type === "plugin") return renderPlugin();
    return null;
  };

  return <div className={`message-bubble ${sender}`}>{renderContent()}</div>;
};

export default MessageBubble;
