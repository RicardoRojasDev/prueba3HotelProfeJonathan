import "./list.css"
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import format from "date-fns/format";
import { DateRange } from 'react-date-range';
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch"


const List = () => {

    const location = useLocation()
    const [destination, setDestination ] = useState(location.state.destination);
    const [dates, setDates ] = useState(location.state.dates);
    const [openDate, setOpenDate] = useState(false);
    const [options, setOptions ] = useState(location.state.options);
    const [min, setMin] = useState(undefined);
    const [max, setMax] = useState(undefined);

    const { data, loading, error, reFetch } = useFetch(`/hotels?city=${destination}&min=${min || 0}&max=${max || 1000}`);
    
    const handleClick = () => {
        reFetch();
      };

    return (
        <div>
          <Navbar />
          <Header type="list" />
          <div className="listContainer">
            <div className="listWrapper">
              <div className="listSearch">
                <h1 className="lsTitle">Buscar</h1>
                <div className="lsItem">
                  <label>Destino</label>
                  <input placeholder={destination} type="text" />
                </div>
                <div className="lsItem">
                  <label>Selecciona Fecha</label>
                  <span onClick={() => setOpenDate(!openDate)}>{`${format(
                    dates[0].startDate,
                    "MM/dd/yyyy"
                  )} al ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                  {openDate && (
                    <DateRange
                      onChange={(item) => setDates([item.selection])}
                      minDate={new Date()}
                      ranges={dates}
                    />
                  )}
                </div>
                <div className="lsItem">
                  <label>Opciones</label>
                  <div className="lsOptions">
                    <div className="lsOptionItem">
                      <span className="lsOptionText">
                        Precio Minimo <small>Por Noche</small>
                      </span>
                      <input type="number" onChange={e=>setMin(e.target.value)} className="lsOptionInput"/>
                    </div>
                    <div className="lsOptionItem">
                      <span className="lsOptionText">
                        Precio Maximo <small>Por Noche</small>
                      </span>
                      <input
                        type="number" className="lsOptionInput" onChange={e=>setMax(e.target.value)} 
                      />
                    </div>
                    <div className="lsOptionItem">
                      <span className="lsOptionText">Adulto</span>
                      <input
                        type="number"
                        min={1}
                        className="lsOptionInput"
                        placeholder={options.adult}
                      />
                    </div>
                    <div className="lsOptionItem">
                      <span className="lsOptionText">Niño</span>
                      <input
                        type="number"
                        min={0}
                        className="lsOptionInput"
                        placeholder={options.children}
                      />
                    </div>
                    <div className="lsOptionItem">
                      <span className="lsOptionText">Habitaciones</span>
                      <input
                        type="number"
                        min={1}
                        className="lsOptionInput"
                        placeholder={options.room}
                      />
                    </div>
                  </div>
                </div>
                <button onClick={handleClick}>Buscar</button>
              </div>
              <div className="listResult">
                {loading ? ("Cargando...") : (
                    <>
                        {data.map((item) => (
                        <SearchItem item={item} key={item._id} />
                        ))}
                    </>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    };

export default List;