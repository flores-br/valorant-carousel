import { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';

const Carousel = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const URL =
        'https://valorant-api.com/v1/agents/dade69b4-4f5a-8528-247b-219e5a1facd6';

      try {
        const response = await axios.get(URL).then(res => res.data);
        setData(response.data);
      } catch (error) {}
    };

    fetchData();
  }, []);

  return (
    <div className="carousel">
      <div className="left">
        <div className="c-title">
          <h1>
            {data.displayName}{' '}
            <span className="c-title-class">{data.role.displayName}</span>{' '}
          </h1>
        </div>
        <div className="c-desc">{data.description}</div>
        <div className="abilities">
          {data.abilities?.map(d => (
            <div className="ability" key={d.slot}>
              <img src={d.displayIcon} alt="Ability Icon" className="a-icon" />
              <div className="a-name">{d.displayName}</div>
              <div className="a-desc">{d.description}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default Carousel;
