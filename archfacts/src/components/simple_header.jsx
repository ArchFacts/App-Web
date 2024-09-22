import React from 'react';
import './simple_header.css';
import '../index.css'

function SimpleHeader() {
    return (
        <div className='header'>
            <div className='imagens'>
                <img className='imagens-logo' src="/assets/imgs/logo.png" alt="" />
                <img className='imagens-af' src="/assets/imgs/logo_af.png" alt="" />
            </div>
            <div className='label'>
                <div className='labels'> Início</div>
                <div className='labels-login'>
                    Login
                </div>
            </div>
        </div>
    )
}

export default SimpleHeader;