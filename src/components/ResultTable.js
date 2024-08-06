import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { getServerData } from '../helper/helper';

const ResultTable = forwardRef((props,ref) => {
  const [data, setData] = useState([]);

  useImperativeHandle(ref, () => ({

    pushToData(item) {
      setData((arr)=>[...arr,item])
    }
  }));

  useEffect(() => {
    getServerData(`${process.env.REACT_APP_API_URL}/result`, (res) => {
      setData(res);
    }).catch(error => console.error('Error fetching result data:', error));
  }, []);

  if (!data || data.length === 0) return <div style={{color:'darkred'}}>No Data Found</div>;

  return (
    <div className='table-container'>
      <table>
        <thead className='table-header'>
          <tr className='table-row'>
            <td>Name</td>
            <td>Attempts</td>
            <td>Earn Points</td>
            <td>Result</td>
          </tr>
        </thead>
        <tbody>
          {data.map((v, i) => (
            <tr className='table-body' key={i}>
              <td>{v?.username || ''}</td>
              <td>{v?.attempts || 0}</td>
              <td>{v?.points || 0}</td>
              <td style={{ color: `${v?.achived === 'Passed' ? "#14731a" : "#ba4141"}`}}>{v?.achived || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
})

export default ResultTable