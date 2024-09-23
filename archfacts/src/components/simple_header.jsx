import React from 'react';
import './simple_header.css';
import '../index.css'

function SimpleHeader() {
    return (
        <div className='header'>
            <div className='imagens'>
            <a href='/'> <img  className='imagens-logo' src="/assets/imgs/logo.png" alt="" /></a>
            <a href="/"> <img className='imagens-af' src="/assets/imgs/logo_af.png" alt="" /></a>
            </div>
            <div className='label'>
                <a href="/"><div className='labels'> Início</div></a> 
            <a href="/"> <div className='labels-login'>
                    Login 
                </div> </a>
            </div>
        </div>
    )
}

export default SimpleHeader;