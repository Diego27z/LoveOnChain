"use client";

import { useState } from "react";

export default function MarriageForm({
  onMarrySubmit,
  fee,
  feeTokenSymbol,
  isLoading,
  currentUserAddress,
}) {
  const [partnerAddress, setPartnerAddress] = useState("");
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    if (
      currentUserAddress &&
      partnerAddress.toLowerCase() === currentUserAddress.toLowerCase()
    ) {
      setFormError(
        "No puedes proponer matrimonio a tu propia dirección de wallet."
      );
      return;
    }
    if (!partnerAddress || !message) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    onMarrySubmit(partnerAddress, message);
  };

  return (
    <div className="card">
      <h2 className="form-title">💍 Propón Matrimonio OnChain</h2>
      <p className="fee-info">
        Tarifa para casarse:{" "}
        <strong>
          {fee} {feeTokenSymbol}
        </strong>
        . Necesitarás estos tokens en tu wallet y aprobar la transacción.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="partnerAddress">
            Dirección de Wallet de tu Pareja:
          </label>
          <input
            id="partnerAddress"
            type="text"
            value={partnerAddress}
            onChange={(e) => setPartnerAddress(e.target.value)}
            placeholder="0x..."
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Mensaje o Voto Matrimonial:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tu mensaje aquí..."
            required
            disabled={isLoading}
          />
        </div>
        {formError && <p className="form-error-text">{formError}</p>}
        {}
        <button type="submit" className="propose-button" disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="spinner"></span>
              <span>Procesando...</span>
            </>
          ) : (
            <span>Proponer Matrimonio</span>
          )}
        </button>
      </form>
    </div>
  );
}
