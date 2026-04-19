interface CardsubtitleProps {
    text: React.ReactNode
}

function Cardsubtitle({ text } : CardsubtitleProps) {
    return <h3 className="text-warm-850">{ text }</h3>
}
export default Cardsubtitle;