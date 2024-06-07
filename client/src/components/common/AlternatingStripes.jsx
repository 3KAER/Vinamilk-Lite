import PropTypes from 'prop-types';

function AlternatingStripes({ firstColor, secondColor, stripeWith }) {
  return (
    <div
      className="w-full h-full"
      style={{
        background: `repeating-linear-gradient(to right, ${firstColor} 0px, ${firstColor} ${stripeWith}px, ${secondColor} ${stripeWith}px, ${secondColor} ${
          stripeWith * 2
        }px)`,
      }}
    ></div>
  );
}

AlternatingStripes.propTypes = {
  firstColor: PropTypes.string.isRequired,
  secondColor: PropTypes.string.isRequired,
  stripeWith: PropTypes.number.isRequired,
};

export default AlternatingStripes;
