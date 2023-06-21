const ComponentAuth = ({ formName, buttonText, title, children, onSubmit }) => {
  return (
    <div className="componentAuth">
      <h2 className="componentAuth__title">{title}</h2>
      <form className="componentAuth__form" name={formName} onSubmit={onSubmit}>
        {children}
        <button className="componentAuth__button">{buttonText}</button>
      </form>
    </div>
  );
};
export default ComponentAuth;
