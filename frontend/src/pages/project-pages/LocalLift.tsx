import PageContainer from "../../components/container/PageContainer";
import PageSection from "../../components/page-section/PageSection";

import censusImg from "../../assets/projects/local-lift/census.png";
import censusStoreSelectImg from "../../assets/projects/local-lift/census-store-select.png";
import placerDemographicsImg from "../../assets/projects/local-lift/placer-demographics.png";
import experianFileSelectImg from "../../assets/projects/local-lift/experian-file-select.png";
import experianFullHandbookImg from "../../assets/projects/local-lift/experian-full-handbook.png";
import experianPieChartsImg from "../../assets/projects/local-lift/experian-pie-charts.png";
import experianTotalsImg from "../../assets/projects/local-lift/experian-totals.png";
import geofinderMapImg from "../../assets/projects/local-lift/geofinder-map.png";
import geofinderResultsImg from "../../assets/projects/local-lift/geofinder-results.png";
import geofinderStoreSelectImg from "../../assets/projects/local-lift/geofinder-store-select.png";
import locationSearchImg from "../../assets/projects/local-lift/location-search.png";
import addRemoveStoreImg from "../../assets/projects/local-lift/add-remove-location.png";
import addStoreModalImg from "../../assets/projects/local-lift/add-store-modal.png";
import homeImg from "../../assets/projects/local-lift/home.png";
import adminImg from "../../assets/projects/local-lift/admin.png";
import presentationImg from "../../assets/projects/local-lift/presentation.JPG";
import channelResponsivenessImg from "../../assets/projects/local-lift/channel-responsiveness.png"
import experianExamplePdf from "../../assets/projects/local-lift/experian-example-pdf.pdf";

const images = {
    home: homeImg,
    admin: adminImg,
    census: censusImg,
    censusStoreSelect: censusStoreSelectImg,
    placerDemographics: placerDemographicsImg,
    experianFileSelect: experianFileSelectImg,
    experianFullHandbookImg: experianFullHandbookImg,
    experianPieCharts: experianPieChartsImg,
    experianTotals: experianTotalsImg,
    channelResponsiveness: channelResponsivenessImg,
    geofinderStoreSelect: geofinderStoreSelectImg,
    geofinderMap: geofinderMapImg,
    geofinderResults: geofinderResultsImg,
    addRemoveStore: addRemoveStoreImg,
    addStoreModal: addStoreModalImg,
    locationSearch: locationSearchImg,
    presentation: presentationImg
} as const;

const LocalLift = () => {
    const IMAGE_WIDTH = "w-220";
    
    const aboutParagraph = <>
        I had the idea of starting this project during my time at S&L Companies. S&L Companies is a Culver's franchise group that owns <b>120+ </b>
        Culver's restaurant locations across <b>5</b> states. I collected, analyzed, and presented local marketing data for restaurant owners and 
        internal marketing and operations teams as part of my role as a data analyst.
        The resources I collected data from offered API support and CSV file download options, so 
        I decided to automate the entire data process so it was directly accessible to all stakeholders.
        After I finished the project, I presented it as part of a larger presentation in front of <b>100+</b> restaurant owners at a franchise wide conference that took place in Kohler, Wisconsin.
        Another Culver's franchise also gained interest in Local Lift and purchased access for use.
    </>

    const structureParagraph = <>
        Local Lift is built on a per-tenant isolated architecture, where each tenant acts as a company or franchise consisting of multiple restaurant locations. 
        The backend is a RESTful API powered by Express.js, with JWT based authentication, rate limiting, and endpoint protection. 
        Data is persisted in a PostgreSQL database, and the frontend is built in React.

    </>

    const featuresParagraph = <>
        Local Lift is composed of three modules. 
        The Geofinder module identifies and categorizes nearby locations, such as potential collaboration partners or guerrilla marketing targets,
        within a configurable radius of a selected Culver's restaurant. 
        It automatically filters out locations that fall closer to a competing Culver's, 
        ensuring the analysis reflects only the selected location's true trade area. 
        The Census Analysis module ingests U.S. Census Bureau data to produce demographic breakdowns by zip code, 
        covering population characteristics, age distributions, income levels, and housing statistics. 
        The Experian module extends Placer.ai's demographics report by parsing Experian Mosaic data and the handbook, 
        enabling targeted audience segmentation.
    </>


    const geofinderParagraphs = {
        storeSelect: <>
            The store select module allows users to choose which restaurant location they would like to analyze within a specified radius.
            In this drop down, along with the census store select module, users can scroll through or search for restaurants within the tenant's database.
            Admins have the additional ability to add and remove locations within this module.
        </>,
        map: <>
            Clicking 'Find Locations' generates a map of sites filtered to avoid proximity to other nearby Culver's locations
            and are categorized based on the tenant's needs. Culver's does a lot of local restaurant marketing where they
            might do a collaboration with a nearby school or do a custard run for nurses at nearby healthcare centers.
            Filtering to avoid proximity to other Culver's locations ensures the locations included on the map will directly
            drive traffic to their restaurant instead of other nearby Culver's. Clicking on a dot on the map will reveal location information like
            name, address, category, and a link to open the site in Google Maps.
        </>,
        list: <>
            The list view is similar to the map view but instead displays all the locations in a list.
        </>
    }

    const censusParagraphs = {
        storeSelect: <>
            The census store select module works just like the geofinder store select. Just choose a store from the dropdown
            and click "Analyze Demographics" to learn more about the store's zip code demographics (store add and remove controls also work the same).
        </>,
        data: <>
            The census module pulls from the latest Census datasets through their public API. The information included in this report like
            population count, household count, median age, median household income, etc are handpicked metrics that are valuable to the tenant.
        </>
    }

    const experianParagraphs = {
        placerBackground: <>
            S&L and other Culver's franchise groups use Placer.ai, 
            which is an advanced location intelligence platform that tracks and analyzes foot traffic, visitor demographics, 
            and consumer behavior to help their marketing teams make data informed marketing decisions. One feature Placer.ai offers is a demographics report that
            uses the Experian Mosaic dataset, which is a comprehensive consumer segmentation and lifestyle database that classifies households into distinct clusters 
            based on their demographics, behaviors, and socioeconomic characteristics. 
            The demographics report breaks down a restaurant's visitors by category, showing the population count and percentage that falls into each.
        </>,
        solution: <>
            This report is missing a few crucial features S&L needed in order to efficiently analyze a local area:
            <ol>
                <li>It only includes a table view of the data, which makes it hard to visualize (see table above).</li>
                <li>
                    <a className="text-link" href="https://assets.cengage.com/gale/help/dnow/DataMethodology/MosaicUSA_Handbook.pdf" target="_blank" rel="noreferrer">The Experian Mosaic Handbook </a> 
                    which includes all of the necessary demographic information is over 300 pages long and difficult to parse.
                </li>
                <li>It does not include a total average measure of marketing channel responsiveness which helps marketing teams determine which marketing mediums would be most effective to campaign through in the local area.</li>
            </ol>
            The Local Lift Experian module was built to solve these issues (admin permission is needed to access this module).
        </>,
        fileUpload: <>
            Placer.ai offers a CSV download option for the data report. A user can download the desired file and easily upload it to Local Lift. Uploading the CSV file triggers the analysis.
        </>,
        pieCharts: <>
           The first module that appears contains two pie charts labeled "Categories" and "Segments". 
           The Experian Mosaic dataset includes broad categories of consumer segments labeled A through S (19 categories).
           They break this down further with specific segments labeled A1 through S71 (71 segments).
           These pie charts sort the categories and segments by population size, which helps marketing teams understand what categories and segments make up most of a restaurant's foot traffic.
           Each pie chart piece can be clicked, which opens a 
           <a className="text-link" href={experianExamplePdf} target="_blank" rel="noreferrer"> condensed 5-6 page PDF </a> 
           which only includes information about the specific category/segment.
           The full Experian Mosaic Handbook is long and not fully organized by category or segment, meaning users have to jump around the large PDF to gather the information they need.
           This module design solves the issue by only including the necessary information in a concise PDF.
           A user can also click the "Download PDFs" button to download the top 5 categories/segments with the highest population.
        </>,
        totals: <>Local Lift averages all the marketing responsiveness channels into one graph to help marketing teams understand how 
        a restaurant's visitors responds to different marketing channels as a whole. This helps teams decide which marketing mediums to run campaigns through.
        </>

    }

    const extraFunctionality = {
        adminDashboard: <>
            A user list is also available to admins which lists all accounts in the tenant's database. 
            An admin can remove admin permissions from a user or give a user admin permissions from this dashboard.
        </>
    }

    const futureParagraph = <>
        I have picked this project back up summer 2026 and into the fall. 
        I want to update the architecture to a multi-tenant monolithic design. 
        Currently, the software must be installed and run as a separate instance per tenant. 
        Instead of maintaining separate deployments, I will update the application to serve multiple tenants from a single running instance, 
        with tenant data and configuration isolated at the application level.
        I also plan to deploy the project to AWS in the future as an ECS paired with RDS.
        
    </>
    
    return (
        <PageContainer>
            <PageSection id="local-lift-about">
                <h1>Local Lift</h1>
                <h2>SaaS Application for Culver's Owners and Marketing Teams</h2>
                <p>{aboutParagraph}</p>
                <div className="flex justify-center"><img className={IMAGE_WIDTH} src={images.presentation}/></div>
            </PageSection>
            <PageSection id="local-lift-structure">
                <h2>Structure</h2>
                <p>{structureParagraph}</p>
            </PageSection>
            <PageSection id="local-lift-features">
                <h2>Features</h2>
                <p>{featuresParagraph}</p>
                <div className="flex justify-center"><img className={IMAGE_WIDTH} src={images.home}/></div>
            </PageSection>
            <PageSection id="local-lift-geofinder">
                <h2>Geofinder</h2>
                <p>{geofinderParagraphs.storeSelect}</p>
                <div className="flex justify-center"><img className={IMAGE_WIDTH} src={images.geofinderStoreSelect}/></div>
                <div className="flex justify-center"><img className={IMAGE_WIDTH} src={images.addRemoveStore}/></div>
                <div className="flex justify-center"><img className="h-200" src={images.addStoreModal}/></div>
                <p>{geofinderParagraphs.map}</p>
                <div className="flex justify-center"><img className={IMAGE_WIDTH} src={images.geofinderMap}/></div>
                <p>{geofinderParagraphs.list}</p>
                <div className="flex justify-center"><img className={IMAGE_WIDTH} src={images.geofinderResults}/></div>
            </PageSection>
            <PageSection id="local-lift-census">
                <h2>Census</h2>
                <p>{censusParagraphs.storeSelect}</p>
                <div className="flex justify-center"><img className={IMAGE_WIDTH} src={images.censusStoreSelect}/></div>
                <p>{censusParagraphs.data}</p>
                <div className="flex justify-center"><img className={IMAGE_WIDTH} src={images.census}/></div>
            </PageSection>
            <PageSection id="local-lift-experian">
                <h2>Experian</h2>
                <p>{experianParagraphs.placerBackground}</p>
                <div className="flex justify-center"><img className={IMAGE_WIDTH} src={images.placerDemographics}/></div>
                <p>{experianParagraphs.solution}</p>
                <div className="flex justify-center"><img className={IMAGE_WIDTH} src={images.experianFullHandbookImg}/></div>
                <div className="flex justify-center"><img className={IMAGE_WIDTH} src={images.channelResponsiveness}/></div>
                <p>{experianParagraphs.fileUpload}</p>
                <div className="flex justify-center"><img className={IMAGE_WIDTH} src={images.experianFileSelect}/></div>
                <p>{experianParagraphs.pieCharts}</p>
                <div className="flex justify-center"><img className={IMAGE_WIDTH} src={images.experianPieCharts}/></div>
                <p>{experianParagraphs.totals}</p>
                <div className="flex justify-center"><img className={IMAGE_WIDTH} src={images.experianTotals}/></div>
            </PageSection>
            <PageSection id="local-lift-extra-functionality">
                <h2> Extra Functionality</h2>
                <p>{extraFunctionality.adminDashboard}</p>
                <div className="flex justify-center"><img className={IMAGE_WIDTH} src={images.admin}/></div>
            </PageSection>
            <PageSection id="local-lift-future">
                <h2>Future Changes</h2>
                <p>{futureParagraph}</p>
            </PageSection>
        </PageContainer>
    )
}
export default LocalLift;