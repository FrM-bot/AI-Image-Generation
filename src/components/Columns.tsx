interface Props {
    children: JSX.Element
}
function Columns({ children }: Props) {
    return (
        <div className="w-full gap-2 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] my-4">
            {children}
        </div>
    )
}

export default Columns