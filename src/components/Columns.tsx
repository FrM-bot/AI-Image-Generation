interface Props {
    children: JSX.Element
}
function Columns({ children }: Props) {
    return (
        <div className="w-full my-2 sm:columns-3 columns-2">
            {children}
        </div>
    )
}

export default Columns