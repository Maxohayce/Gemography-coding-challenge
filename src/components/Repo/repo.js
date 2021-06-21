// Module imports
import PropTypes from 'prop-types'

/**
 * Repo component
 * @component
 * @return {object} - The UI DOM object
 * @example
 * 
 * const id = 0;
 * const description = "";
 * const owner = {
 *                avatar_url: ""
 *                login: ""
 *                }
 * return <Repo id={id} description={description} owner={owner} /> 
 */
const Repo = ({id, description, owner}) => (
  <li key={id}>
    <img src={owner?.avatar_url} alt="avatar" />
    <h1>{owner?.login}</h1>
    <p>{description}</p>
  </li>
);

Repo.propTypes = {
  /**
   * Repo id
   */
  id: PropTypes.number,
  /**
   * Repo description
   */
  description: PropTypes.string,
  /**
   * Repo owner
   */
  owner: PropTypes.object
}

Repo.defaultProps = {
  id: null,
  description: "",
  owner: {
    avatar_url: "",
    login: ""
  }
}

// Component export
export default Repo;