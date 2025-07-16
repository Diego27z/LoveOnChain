"use client";

export default function MarriageDetails({ details, onDivorce }) {
  if (!details) return null;

  const marriageDate = new Date(
    Number(details.timestamp) * 1000
  ).toLocaleString();

  return (
    <div className="card">
      <h2>🎉 ¡Felicidades, estás casado!</h2>
      <p>
        <strong>Cónyuge 1:</strong> {details.partner1}
      </p>
      <p>
        <strong>Cónyuge 2:</strong> {details.partner2}
      </p>
      <p>
        <strong>Fecha del enlace:</strong> {marriageDate}
      </p>
      <div className="message-box">
        <p>
          <strong>Vuestro Mensaje:</strong>
        </p>
        <blockquote>“{details.message}”</blockquote>
      </div>
      <button onClick={onDivorce} className="button-danger">
        Solicitar Divorcio
      </button>
    </div>
  );
}
