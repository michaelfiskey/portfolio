interface CardsubtitleProps {
    text: React.ReactNode
}

function Cardsubtitle({ text } : CardsubtitleProps) {
    return <h3 className="text-[#5f4a3a]">{ text }</h3>
}
export default Cardsubtitle;