import { Alert } from 'antd';
import styled from 'styled-components'

const AlertConatainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    position: fixed;
    align-items: flex-start;
    top: 72px;
    right: 22px;
`

const Alerts = (props) => {
    console.log("props", props)
    return (
        <AlertConatainer>
            <Alert
                message={props.message}
                // description={props.message}
                type={props.type}
                showIcon
                closable
            />
        </AlertConatainer>
    )
}
export default Alerts