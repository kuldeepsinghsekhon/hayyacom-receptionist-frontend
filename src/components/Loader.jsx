import { Spin, Space } from 'antd';
import styled from 'styled-components'

const LoaderContainer = styled.div`
   position: fixed;
    width: 100vw;
    height: 100vh;
    background: black url(spinner.gif) center center no-repeat;
    opacity: 0.5;
    display: flex;
    justify-content: center;
    z-index: 1;
`

const Loader = () => {
    return (
        <LoaderContainer>
            <Space size="middle">
                <Spin size="large" />
            </Space>,
        </LoaderContainer>
    )
}

export default Loader