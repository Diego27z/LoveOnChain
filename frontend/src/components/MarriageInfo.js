import React from "react";
import { ethers } from "ethers";
import "./MarriageInfo.css";

const MarriageInfo = ({ marriage, account }) => {
  const isPartner1 =
    ethers.getAddress(marriage.partner1) === ethers.getAddress(account);
  const partner = isPartner1 ? marriage.partner2 : marriage.partner1;

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="card marriage-certificate pulse">
      <div className="certificate-header">
        <h2>Certificado de Matrimonio Blockchain</h2>
        <div className="decoration-ring">💍</div>
      </div>

      <div className="certificate-body">
        <p className="intro">Este certificado verifica que</p>

        <div className="partners">
          <div className="partner you">
            <div className="label">Tú</div>
            <div className="address">{account}</div>
          </div>

          <div className="and">y</div>

          <div className="partner them">
            <div className="label">Tu pareja</div>
            <div className="address">{partner}</div>
          </div>
        </div>

        <p className="declaration">
          están unidos en matrimonio según el contrato inteligente en la
          blockchain Ethereum.
        </p>

        {marriage.message && (
          <div className="love-message">
            <div className="heart">❤️</div>
            <blockquote>"{marriage.message}"</blockquote>
          </div>
        )}

        <div className="details">
          <div className="detail">
            <span className="label">Fecha:</span>
            <span className="value">{formatDate(marriage.timestamp)}</span>
          </div>
          <div className="detail">
            <span className="label">ID de Transacción:</span>
            <span className="value">
              {marriage.transactionHash || "No disponible"}
            </span>
          </div>
        </div>
      </div>

      <div className="certificate-footer">
        <p>Este certificado es inmutable y permanente en la blockchain.</p>
        <div className="signature">LoveChain DApp</div>
      </div>
    </div>
  );
};

export default MarriageInfo;
