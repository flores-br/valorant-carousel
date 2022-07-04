import { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

const Carousel = () => {
  const [agentData, setAgentData] = useState(null);
  const [current, setCurrent] = useState(0);
  const [length, setLength] = useState(0);
  const URL = 'https://valorant-api.com/v1/agents?isPlayableCharacter=true';

  const fetchData = async () => {
    try {
      const response = await axios.get(URL).then(res => res.data.data);
      setAgentData(await response);
      setLength(await response.length);
    } catch (err) {
      console.log(err);
    }
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

  return !agentData ? null : (
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
                <img src={obj.fullPortraitV2} alt="" className="agent" />
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default Carousel;
