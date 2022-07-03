import { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';

const Carousel = () => {
  const [agentData, setAgentData] = useState({
    displayName: '',
    description: '',
    fullPortraitV2: '',
    role: {},
    abilities: [],
    backgroundGradientColors: [],
  });
  const URL =
    'https://valorant-api.com/v1/agents/dade69b4-4f5a-8528-247b-219e5a1facd6';

  const fetchData = async () => {
    try {
      const response = await axios.get(URL).then(res => res.data.data);
      setAgentData(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(agentData);

  return (
    <div className="carousel">
      <div className="left">
        <img
          src={agentData.role.displayIcon}
          alt="Role Icon"
          className="c-icon"
        />
        <div className="c-title">
          <h1>
            {agentData.displayName}
            <span className="c-title-class">
              {agentData.role.displayName}
            </span>{' '}
          </h1>
        </div>
        <div className="c-desc">{agentData.description}</div>
        <div className="abilities">
          {agentData.abilities.map(d => (
            <div className="ability" key={d.slot}>
              <img src={d.displayIcon} alt="Ability Icon" className="a-icon" />
              <div className="a-name">{d.displayName}</div>
              <div className="a-desc">{d.description}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="right">
        <div
          className="right-bg"
          style={{ background: `#${agentData.backgroundGradientColors[1]}` }}
        ></div>
        <div
          className="right-outline"
          style={{ background: `#${agentData.backgroundGradientColors[2]}` }}
        ></div>
        <img src={agentData.fullPortraitV2} alt="" className="agent" />
      </div>
    </div>
  );
};

export default Carousel;
