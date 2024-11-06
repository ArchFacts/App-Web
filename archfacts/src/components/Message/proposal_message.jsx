import React from "react";
import stylesProposalMessage from './proposal_message.module.css'

const ProposalMessage = ({ label, type, name, value, onChange }) => {
    return (
        <div className={stylesProposalMessage.message_area}>
            <div className={stylesProposalMessage.div_input}>
                <label>{label}</label>
                <textarea
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required
                    rows={5}
                />
            </div>
        </div>
    );
};

export default ProposalMessage;