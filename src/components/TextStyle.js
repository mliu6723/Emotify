import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MainTitle = styled.div`
  font-family: 'Poppins', cursive;
  font-size: 100px;
  color: white;
  font-weight: bold;
  text-align: center;
  margin-top: 2rem;
`;

export const BigButton = styled.button`
  font-family: inherit;
  font-size: 15px;
  border: none;
  border-radius: 7px;
  background-color: #1db954;
  color: white;
  height: 50px;
  width: 200px;
  cursor: pointer;
  outline: none;
  display: block;
  margin-bottom: 1rem;

  &:hover {
    background-color: #2ad666;
    transition: background-color, 0.5s;
  }
`;

export const ButtonWrappers = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Subtitle = styled.span`
  font-family: 'Poppins';
  text-align: center;
  font-weight: 700;
  font-size: 50px;
  color: white;
  margin-top: 3rem;
`;

export const BgText = styled.span`
  font-family: 'Poppins';
  text-align: center;
  font-weight: 100;
  font-size: 20px;
  color: white;
  margin-top: 1rem;
`;