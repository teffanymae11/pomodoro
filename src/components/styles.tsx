import styled from 'styled-components'

export const Dboard = styled.div`
  background: #98A7A7;
  height: 100vh;
  overflow: hidden;

  @media screen and (max-width: 1200px) {
    display: none;
  }
`

export const Notice = styled.div`
  display: none;
  @media screen and (max-width: 1200px) {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    color: #000;
  }
`

export const Center = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%)
`

export const BtnBlock = styled.div`
  margin-left: 24px;
  margin-bottom: 18px;
  text-align: left;
`

export const Ul = styled.ul`
  ::-webkit-scrollbar {
      display: none;
  }
  height: 293px;
  max-height: 293px;
  overflow-y: scroll;
  overflow-x: hidden;
  list-style-type: none;
  padding: 0;
  padding-right: 10px;
`

export const Li = styled.li`
  margin-bottom: 20px;
`

export const Btn = styled.img`
  cursor: pointer;
  margin-right: 13px;
`

export const BtnImg = styled.img`
  cursor: pointer;
`

export const TimerDisplay = styled.div`
  margin: 0 auto;
  margin-bottom: 50px;
  position: relative;
  background: #CBD8C8;
  border: 5px solid #000;
  height: 306px;
  width: 491px;
  padding: 50px 0;
`

export const Hr1 = styled.img`
  margin-left: 49px;
  margin-right: 29px;
`

export const Header1 = styled.h1`
  font-family: Courier New;
  font-weight: bold;
  font-size: 58px;
  margin-left: 49px;
  color: #000;
  text-align: left;
`

export const Header2 = styled.h2`
  font-family: Courier New;
  font-weight: bold;
  font-size: 28px;
  margin-left: 49px;
  color: #000;
  text-align: left;
  text-transform: capitalize;
`

export const BreakBlock = styled.div`
  text-align: left;
  margin-left: 49px;
`

export const AddTodoBlock = styled.div`
  position: absolute;
  bottom: -36px;
  right: -43px;
`

export const TodoBlock = styled.div`
  margin: 0 auto;
  width: 390px
`

export const Img = styled.img`
  text-align: left;
  margin-bottom: 16px;
`

export const TextGroup = styled.div`
  display: inline-block;
`

export const Heading3 = styled.h3`
  font-family: Courier New;
  font-weight: bold;
  font-size: 17px;
  max-width: 245px;
  margin-bottom: 0;
`

export const Paragraph = styled.p`
  margin-left: 11px;
  margin-right: 45px;
  margin-bottom: 0;
  max-width: 210px;
  font-family: Courier New;
  font-weight: normal;
  font-size: 11px;
  text-align: left;
`

export const BtnPlayBlock = styled.img`
  cursor: pointer;
  margin-right: 18px;
  float: left;
`

export const BtnTodoBlock = styled.div`
  display: inline-block;
  float: right;
`

export const BtnTodo = styled.img`
  cursor: pointer;
  margin-right: 5px;
`