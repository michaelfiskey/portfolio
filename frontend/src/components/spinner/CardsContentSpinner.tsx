import GridCardContainer from "../container/GridCardContainer";
import ContentSpinner from "./ContentSpinner";

type CardsContentSpinnerProps = {
    numCards?: number;
};

const CardsContentSpinner = ({ numCards = 6 }: CardsContentSpinnerProps) => {
    return (
        <GridCardContainer>
            {Array.from({ length: numCards }, (_, i) => (
                <ContentSpinner key={i} />
            ))}
        </GridCardContainer>
    );
};

export default CardsContentSpinner;