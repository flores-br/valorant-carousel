import { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { Triangle } from 'react-loader-spinner';

const Carousel = () => {
  const [agentData, setAgentData] = useState(null);
  const [current, setCurrent] = useState(0);
  const [length, setLength] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const URL = 'https://valorant-api.com/v1/agents?isPlayableCharacter=true';

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(URL).then(res => res.data.data);
      setAgentData(await response);
      setLength(await response.length);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <Triangle ariaLabel="loading-indicator" color="grey" />
  ) : (
    <div className="carousel">
      <AiOutlineArrowLeft className="left-arrow" onClick={prevSlide} />
      <AiOutlineArrowRight className="right-arrow" onClick={nextSlide} />
      {agentData.map(
        (obj, index) =>
          index === current && (
            <div className="wrapper" key={index}>
              <div className="left">
                <img
                  src={obj.role.displayIcon}
                  alt="Role Icon"
                  className="c-icon"
                />
                <div className="c-title">
                  <h1>
                    {obj.displayName}
                    <span className="c-title-class">
                      {obj.role.displayName}
                    </span>{' '}
                  </h1>
                </div>
                <div className="c-desc">{obj.description}</div>
                <div className="abilities">
                  {obj.abilities.map(d => (
                    <div className="ability" key={d.slot}>
                      <img
                        src={d.displayIcon}
                        alt="Ability Icon"
                        className="a-icon"
                      />
                      <div className="a-name">{d.displayName}</div>
                      <div className="a-desc">{d.description}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="right">
                <div
                  className="right-bg"
                  style={{
                    background: `#${
                      obj.backgroundGradientColors
                        ? obj.backgroundGradientColors[1]
                        : 'ff4a51'
                    }`,
                  }}
                ></div>
                <div
                  className="right-outline"
                  style={{
                    background: `#${
                      obj.backgroundGradientColors
                        ? obj.backgroundGradientColors[2]
                        : '0f0f0f'
                    }`,
                  }}
                ></div>
                <img src={obj.fullPortrait} alt="" className="agent" />
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default Carousel;
