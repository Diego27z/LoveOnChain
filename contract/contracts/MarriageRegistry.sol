// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract MarriageRegistry is Ownable {

    // --- ESTRUCTURAS Y EVENTOS ---

    struct Marriage {
        address partner1;
        address partner2;
        string message;
        uint256 timestamp;
        bool isActive;
    }

    event MarriageCreated(address indexed partner1, address indexed partner2, string message, uint256 timestamp);
    event Divorced(address indexed partner1, address indexed partner2, uint256 timestamp);

    // --- VARIABLES DE ESTADO ---

    mapping(address => Marriage) public marriages;
    mapping(address => bool) public isMarried;

    IERC20 public feeToken; 
    uint256 public marriageFee; 

    // --- CONSTRUCTOR ---

    /**
     * @dev .
     * @param _feeTokenAddress .
     * @param _initialFee .
     */
//                                              
constructor(address _feeTokenAddress, uint256 _initialFee) Ownable(msg.sender) {
    feeToken = IERC20(_feeTokenAddress);
    marriageFee = _initialFee;
}

    // --- FUNCIONES PRINCIPALES ---

    /**
     * @dev Crea un nuevo matrimonio entre msg.sender y _partner.
     * .
     * @param _partner La dirección de la pareja.
     * @param _message Un mensaje o voto matrimonial.
     */
    function marry(address _partner, string calldata _message) external {
        require(msg.sender != _partner, "MarriageRegistry: No puedes casarte contigo mismo");
        require(!isMarried[msg.sender], "MarriageRegistry: Ya estas casado");
        require(!isMarried[_partner], "MarriageRegistry: Tu pareja ya esta casada");

        // Comprobación de la aprobación (allowance)
        uint256 allowance = feeToken.allowance(msg.sender, address(this));
        require(allowance >= marriageFee, "MarriageRegistry: Revisa la aprobacion del token, es insuficiente");

        // Transfiere la tarifa desde el usuario hacia este contrato.
       
        bool success = feeToken.transferFrom(msg.sender, address(this), marriageFee);
        require(success, "MarriageRegistry: La transferencia del token fallo");

        Marriage memory newMarriage = Marriage({
            partner1: msg.sender,
            partner2: _partner,
            message: _message,
            timestamp: block.timestamp,
            isActive: true
        });

        marriages[msg.sender] = newMarriage;
        marriages[_partner] = newMarriage;

        isMarried[msg.sender] = true;
        isMarried[_partner] = true;

        emit MarriageCreated(msg.sender, _partner, _message, block.timestamp);
    }

    /**
     * @dev Permite a cualquiera de los dos miembros de un matrimonio disolverlo.
     */
    function divorce() external {
        require(isMarried[msg.sender], "MarriageRegistry: No estas casado");
        
        Marriage storage marriageToEnd = marriages[msg.sender];
        require(marriageToEnd.isActive, "MarriageRegistry: Tu matrimonio ya esta inactivo");

        address partner1 = marriageToEnd.partner1;
        address partner2 = marriageToEnd.partner2;

        
        marriageToEnd.isActive = false;

        
        isMarried[partner1] = false;
        isMarried[partner2] = false;

        emit Divorced(partner1, partner2, block.timestamp);
    }
    
    // --- FUNCIONES DE LECTURA (GETTERS) ---

    function getMarriageDetails(address _user) external view returns (Marriage memory) {
        require(isMarried[_user], "MarriageRegistry: El usuario no esta casado");
        return marriages[_user];
    }

    // --- FUNCIONES ADMINISTRATIVAS (SOLO PARA EL DUEÑO) ---

    /**
     * @dev Permite al dueño del contrato retirar los tokens ERC20 acumulados.
     * @param _tokenAddress La dirección del token a retirar.
     */
    function withdrawTokens(address _tokenAddress) external onlyOwner {
        IERC20 token = IERC20(_tokenAddress);
        uint256 balance = token.balanceOf(address(this));
        require(balance > 0, "MarriageRegistry: No hay fondos para retirar");
        token.transfer(owner(), balance);
    }

    /**
     * @dev Permite al dueño cambiar la tarifa del matrimonio.
     * @param _newFee La nueva tarifa.
     */
    function setMarriageFee(uint256 _newFee) external onlyOwner {
        marriageFee = _newFee;
    }

    /**
     * @dev Permite al dueño cambiar el token aceptado para la tarifa.
     * @param _newFeeTokenAddress La dirección del nuevo token.
     */
    function setFeeToken(address _newFeeTokenAddress) external onlyOwner {
        require(_newFeeTokenAddress != address(0), "MarriageRegistry: Direccion de token invalida");
        feeToken = IERC20(_newFeeTokenAddress);
    }
}