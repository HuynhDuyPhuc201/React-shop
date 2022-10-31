

import {
  LoadingOutlined,
} from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';

const IconStyle = styled.span`
  display: flex;
  margin-right: 10px;
`
const ButtonRoot = styled.button`
  display: flex;
  align-items: center;

  &:disabled{
    cursor: no-drop;
  }
`

function Button({children, loading, ...props}) {
  return (
    <ButtonRoot {...props} disabled={loading} className="btn btn-sm btn-dark" type="submit">
      { loading &&  <IconStyle>
                      <LoadingOutlined />
                    </IconStyle> 
      }
      {children}
    </ButtonRoot>
  )
}

export default Button