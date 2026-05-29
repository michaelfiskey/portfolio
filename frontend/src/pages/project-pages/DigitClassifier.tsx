import PageContainer from "../../components/container/PageContainer";
import PageSection from "../../components/page-section/PageSection";

import lossAccuracyImg from "../../assets/projects/digit-classifier/loss_accuracy.png";
import misclassificationsImg from "../../assets/projects/digit-classifier/misclassifications.png";
import wrongGuessesImg from "../../assets/projects/digit-classifier/wrongguesses.png";

const images = {
    lossAccuracy: lossAccuracyImg,
    misclassifications: misclassificationsImg,
    wrongGuesses: wrongGuessesImg,
} as const;

const DigitClassifier = () => {
    const introParagraphs = [
        <>
            My machine learning class at UW-Milwaukee taught me the theory behind deep neural networks
            and how they are implemented through various class projects utilizing the Sklearn library.
            I wanted to take this a step further and challenge myself to implement the neural network framework
            and backpropagation algorithm from scratch.
        </>,
        <>
            I decided to use the <a className="text-link" href="https://www.kaggle.com/datasets/hojjatk/mnist-dataset" target="_blank" rel="noreferrer">MNIST dataset </a> 
            for this project and designed a vanilla deep neural network with leaky relu and softmax activation functions and 
            cross-entropy loss to classify digits 0-9 from 28x28 grayscale images (MNIST) with <b>~95%</b> accuracy.
        </>
    ]
    const analysisSection = {
        introParagraph : <>
            Overall, my model was able to correctly classify 94.82% of the examples it was tested on. 
            Not far off <a className="text-link" href="https://arxiv.org/html/2603.12850" target="_blank" rel="noreferrer">the best model as of November 2025</a>,
            which consists of multiple connected CNNs that was able to correctly classify MNIST digits with 99.91% accuracy.
        </>,
        lossAccuracyParagraph : <>
            The figure above outlines the loss and accuracy measures at each epoch.
            I chose 10 epochs of training for the MNIST dataset on this neural network because
            the validation and training sets for both loss and accuracy more or less converge at this epoch.
            In other words, continuing to train the model on more epochs would lead to overfitting, as the neural network
            would start to memorize the training data instead of generalize from it. 
            This would cause training accuracy to increase while validation (and inevitably overall) accuracy decreases.
        </>,
        misclassificationsParagraph : <>
            These two bar graphs show where the model struggled most, broken down by digit class. 
            The left chart shows the raw count of wrong predictions per digit, 
            while the right shows those same errors as a percentage of the entire test set. 
            Digits 0 and 1 were classified most accurately, each with only 18-20 misclassifications. 
            These digits have simple and distinct shapes, which likely made it easy for the neural network to pick up on their features. 
            The model performed worst on digits 2, 7, 8, and 9, each exceeding 60 misclassifications with a ~0.70 - 0.75% error rate. 
        </>,
        wrongGuessesParagraph: <>
            Digging a little deeper, each of these bar graphs shows which digits the model incorrectly guessed for the four hardest digits: 2, 7, 8, and 9. 
            Digit 2 was most often confused with 8 (~17 times), which would resemble an 8 if its middle diagonal were closed into a loop.
            Digit 7 was significantly misclassified as 9 (~25 times), likely because both digits share a similar structure of an upper horizontal 
            stroke connected to a downward diagonal line. 
            Digit 8 was most often confused with 3 (~16 times) and 5 (~16 times): 3 would closely resemble 8 if a vertical stroke were added on the left side, 
            and similarly 5 would resemble 8 if its middle diagonal were closed into a loop. 
            Digit 9 was most frequently misclassified as 4 (~21 times), likely because the two share a very similar closed upper loop. 
        </>,
        conclusionParagraph: <>
            All of the above bar graphs paint a bigger picture. While my model scores with 94.82% accuracy overall, 
            it does not take into consideration the varation of error across digit classes. 
            My model can handle simple, distinct digits like 0 and 1 but struggles with digits that share structual features.
            This pattern suggests that the representations my model abstracted may not be descriptive enough to separate visually similar digits.
        </>

    }
      
    const conclusionParagraphs = [
        <>
            There are several optimizations I could have implemented to improve my model further. 
            One option would have been to use <b>parametric ReLU (PReLU)</b> instead of leaky ReLU. 
            Unlike leaky ReLU, which binds the negative-slope coefficient to a single fixed value, 
            PReLU allows the network to learn the coefficient through backpropagation, 
            meaning each activation can tune itself to a value that minimizes the loss, 
            rather than being stuck at a fixed constant I set arbitrarily.
        </>,
        <>
            Another improvement would have been incorporating <b>randomized dropout</b> during training. 
            By randomly deactivating a different subset of neurons on each forward pass, 
            the network is forced to learn more generalized representations of the data instead of relying on specific neurons to memorize training examples. 
            This would have helped reduce overfitting and likely improved overall accuracy.
        </>,
        <>
            Finally, implementing a <b>convolutional neural network (CNN)</b> instead would have been the most impactful change. 
            My fully connected model can still learn to detect abstract features like edges, curves, and shapes through its successive hidden layers, 
            but it has no built-in way to recognize that a feature in one part of an image is the same as that feature somewhere else. 
            CNNs achieve translational equivariance through the shared weights they use in convolutional filters. 
            This would have made my model far better at classifying features regardless of where they appear in the image.
        </>
    ]

    return (
        <PageContainer>
            <PageSection id='digit-classifier-about'>
                <h1>Digit Classifier</h1>
                <h2>Neural Network Built From Scratch.</h2>
                {introParagraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
            </PageSection>
            <PageSection id='digit-classifier-implementation'>
                <h2>Implementation</h2>
                <div style={{ overflowX: "auto" }}>
                    <iframe
                        src="/projects/digit-classifier/nn.html"
                        title="Digit Identifier Notebook"
                        style={{ width: "100%", minWidth: "400px", height: "60vh", border: "none" }}
                    />
                    <p><i>Note: Extra code included in training and testing for further model analysis.</i></p>
                </div>
            </PageSection>
            <PageSection id='digit-classifier-analysis'>
                <h2>Analysis</h2>
                <p>{analysisSection.introParagraph}</p>
                <div className="flex justify-center">
                    <img src={images.lossAccuracy} alt="Loss and accuracy over training epochs" className="max-w-5xl w-full" />
                </div>
                <p>{analysisSection.lossAccuracyParagraph}</p>
                <div className="flex justify-center">
                    <img src={images.misclassifications} alt="Misclassified examples" className="max-w-5xl w-full" />
                </div>
                <p>{analysisSection.misclassificationsParagraph}</p>
                <div className="flex justify-center">
                    <img src={images.wrongGuesses} alt="Wrong guesses" className="max-w-5xl w-full" />
                </div>
                <p>{analysisSection.wrongGuessesParagraph}</p>
                <p>{analysisSection.conclusionParagraph}</p>
            </PageSection>
            <PageSection id='digit-classifier-conclusion'>
                <h2>Conclusion</h2>
                {conclusionParagraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
            </PageSection>
        </PageContainer>
    )
}
export default DigitClassifier;