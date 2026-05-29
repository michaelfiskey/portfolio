import PageContainer from "../../components/container/PageContainer";
import PageSection from "../../components/page-section/PageSection";

import censusImg from "../../assets/projects/local-lift/census.png";
import experianPieChartsImg from "../../assets/projects/local-lift/experian-pie-charts.png";
import experianTotalsImg from "../../assets/projects/local-lift/experian-totals.png";
import geofinderMapImg from "../../assets/projects/local-lift/geofinder-map.png";
import geofinderResultsImg from "../../assets/projects/local-lift/geofinder-results.png";
import locationSearchImg from "../../assets/projects/local-lift/location-search.png";

const images = {
    census: censusImg,
    experianPieCharts: experianPieChartsImg,
    experianTotals: experianTotalsImg,
    geofinderMap: geofinderMapImg,
    geofinderResults: geofinderResultsImg,
    locationSearch: locationSearchImg
} as const;

const LocalLift = () => {
    return (
        <PageContainer>
            <PageSection id="local-lift-about">
                <h1>Local Lift</h1>
                <h2>SaaS Application for Culver's Owners and Marketing Teams</h2>
            </PageSection>
        </PageContainer>
    )
}
export default LocalLift;