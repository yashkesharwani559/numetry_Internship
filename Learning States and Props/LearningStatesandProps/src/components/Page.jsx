import react,{useState, useEffect} from 'react'

export default function Page(prop) {
    const [count, setCount] = useState(prop.count);
    const obj = {
      1: "bg-gray-700",
      2: "bg-white-700",
      3: "bg-stone-700",
      4: "bg-zinc-700",
      5: "bg-emerald-700"
    };

    let col = obj[count]
    const [bgColor, setBgColor] = useState(col)
    const handleChangeColor = (color) => {
        setBgColor(color);
        count<6? setCount(count + 1): setCount(1)
    }

    return <>
        <div className={`block flex items-center justify-center h-screen w-full ${bgColor}`}>
            <div className="grid grid-cols-4 gap-64">
                <button onClick = {() => handleChangeColor("bg-blue-200")} className="bg-blue-500 text-white px-6 py-2 rounded-lg">Button 1</button>
                <button onClick = {() => handleChangeColor("bg-green-200")}  className="bg-green-500 text-white px-6 py-2 rounded-lg">Button 2</button>
                <button onClick = {() => handleChangeColor("bg-red-200")}  className="bg-red-500 text-white px-6 py-2 rounded-lg">Button 3</button>
                <button onClick = {() => handleChangeColor("bg-yellow-200")}  className="bg-yellow-500 text-white px-6 py-2 rounded-lg">Button 4</button>
                <button  onClick = {() => handleChangeColor("bg-purple-200")}  className="bg-purple-500 text-white px-6 py-2 rounded-lg">Button 5</button>
                <button onClick = {() => handleChangeColor("bg-pink-200")}  className="bg-pink-500 text-white px-6 py-2 rounded-lg">Button 6</button>
                <button onClick = {() => handleChangeColor("bg-indigo-200")}  className="bg-indigo-500 text-white px-6 py-2 rounded-lg">Button 7</button>
                <button onClick = {() => handleChangeColor("bg-teal-200")}  className="bg-teal-500 text-white px-6 py-2 rounded-lg">Button 8</button>
            </div>


            <button className={`${obj[count]} text-black text-3xl px-10 py-4 rounded-lg`} onClick={() => handleChangeColor(obj[count])}>Reset</button>
        </div>
    </>;
}