import React, { useContext, useState, useEffect } from "react";
import "./Settings.css";
import { CheckCircle, Close, RadioButtonChecked } from "@mui/icons-material";
import { DataContext } from "../../App";
import { settingsData } from "./settingsData";
import { AnimatePresence, motion } from "framer-motion";
import { pageVariants, tabVariants } from "../../variants";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";

const Settings = () => {
  const { settings, dispatchSettings, t } = useContext(DataContext);
  const [direction, setDirection] = useState(true);

  const currentObj = settingsData.find((obj) => obj.id === settings.currentTab);

  useEffect(() => {
    i18n.changeLanguage(settings.language);
    localStorage.setItem("language", JSON.stringify(settings.language));
  }, [settings.language, i18n]);

  useEffect(() => {
    localStorage.setItem("currency", JSON.stringify(settings.currency));
    localStorage.setItem("locale", JSON.stringify(settings.locale));
    localStorage.setItem("fontTheme", JSON.stringify(settings.fontTheme));
  }, [
    settings.currency,
    settings.locale,
    settings.fontTheme,
  ]);

  return (
    <motion.section
      className="wrapper settings"
      variants={pageVariants}
      initial="initial"
      animate="visible"
      exit="exit"
    >
   
      <div className="settings-container" key={settings.currentTab}>
        <motion.article className="theme-wrapper">
          <nav className="sidebar-wrapper">
            {settingsData.map((obj) => {
              const isActive = settings.currentTab === obj.id;
              return (
                <button
                  key={obj.id}
                  type="button"
                  className={`slider-btn ${isActive && "active-tab"}`}
                  onClick={() => {
                    dispatchSettings({
                      type: "UPDATE_TAB",
                      payload: { tab: obj.id, key: "currentTab" },
                    });
                    setDirection(!direction);
                  }}
                >
                  <obj.icon
                    className={`slider-icon ${isActive && "active-icon"}`}
                  />
                  <span className="slider-text">{t(obj.label)}</span>
                </button>
              );
            })}
          </nav>
          <motion.div
            className="theme-content-wrapper"
            variants={tabVariants(direction)}
            initial="hidden"
            animate="visible"
            key={settings.currentTab}
            exit="exit"
          >
            <header className="theme-header">
              <h2 className="settings-title">{t(currentObj.label)}</h2>
              <p className="settings-parag">{t(currentObj.parag)}</p>
            </header>
            <div className="options-wrapper">
              {currentObj.options.map((option) => {
                const isActive = settings[currentObj.id] === option.name;
                return (
                  <button
                    key={option.id}
                    type="button"
                    className={`option-btn ${isActive && "active-option"}`}
                    onClick={() => {
                      dispatchSettings({
                        type: "UPDATE_TAB",
                        payload: { tab: option.name, key: currentObj.id },
                      });
                      {
                        currentObj.id === "currency" &&
                          dispatchSettings({
                            type: "UPDATE_TAB",
                            payload: { tab: option.locale, key: "locale" },
                          });
                      }
                    }}
                  >
                    <span className="theme-option-wrapper">
                      {currentObj.id === "currency" && (
                        <span className={`color-icon-wrapper`}>
                          <option.icon className="option-icon" />
                        </span>
                      )}
                      {currentObj.id === "colorTheme" && (
                        <span className="color-icon-wrapper">
                          <option.icon className="option-icon" />
                        </span>
                      )}

                      {currentObj.id === "fontTheme" && (
                        <span
                          className="font-text-label"
                          style={{ fontFamily: option.name }}
                        >
                          Aa
                        </span>
                      )}

                      {currentObj.id === "language" && (
                        <span className="language-icon-wrapper">
                          <img src={option.icon} className="option-img" />
                        </span>
                      )}

                      <span className="text-wrapper">
                        <h2
                          className="theme-label"
                          style={
                            currentObj.id === "fontTheme"
                              ? { fontFamily: option.name }
                              : {}
                          }
                        >
                          {t(option.text)}
                        </h2>
                        <p
                          className="theme-parag"
                          style={
                            currentObj.id === "fontTheme"
                              ? { fontFamily: option.name }
                              : {}
                          }
                        >
                          {t(option.parag)}
                        </p>
                      </span>
                    </span>

                    <span className="option-status">
                      {isActive ? (
                        <CheckCircle className="check-icon" />
                      ) : (
                        <RadioButtonChecked className="checked-icon" />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.article>
      </div>
    </motion.section>
  );
};

export default Settings;
