type Props = {
  value0: string;
  value1: number;
};

export default function Price({value0, value1}: Props) {
    return(
        <>
            <p className="font-bold">{value0}{value1}</p>
        </>
    )
}