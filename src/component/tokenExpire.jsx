import {jwtDecode} from "jwt-decode";

/**
 * Checks if the access token is expired.
 * @param {string} token - The JWT access token.
 * @returns {boolean} - Returns true if the token is expired, false otherwise.
 */
export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decodedToken = jwtDecode(token);  // Decode the token to get its payload
    const currentTime = Date.now() / 1000;  // Get the current time in seconds (Unix timestamp)

    // Compare current time with the token's expiration time
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;  // Treat the token as expired if there's an error in decoding
  }
};

