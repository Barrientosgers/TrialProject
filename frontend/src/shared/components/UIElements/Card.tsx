import classes from "./Card.module.css";
import cx from "classnames";

const Card: React.FC<{
  class: string;
  id: string;
  children: React.ReactNode;
}> = (props) => {
  return (
    <div id={props.id} className={cx(props.class, classes.card)}>
      {props.children}
    </div>
  );
};

export default Card;
