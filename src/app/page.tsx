"use client";

import { useEffect, useState } from "react";
import { Options, Players, createMaze } from "./sketch";
import { Step, StepWithDirection } from "./step";
import { P5Drawer } from "./p5-drawer";

const options: Options = {
  waitTime: 200,
}

let drawer: P5Drawer;

export default function Home() {
  const [player, setPlayer] = useState<Players>(Players.LOTERIA);
  const [mazeName, setMazeName] = useState<string>('labirinto');
  const [waitTime, setWaitTime] = useState<number>(250);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<Step>();

  useEffect(() => {
    options.onAction = (step, currentIndex) => {
      setCurrentStep(step);
      setCurrentIndex(currentIndex);
    }

    options.onEnd = (cs) => {
      setCurrentStep(cs);
      alert("terminou o circuito ou a quantidade de passos");
    }
  });

  useEffect(() => {
    // Client-side-only code

    drawer?.canvas?.remove();

    createMaze(mazeName, player, options).then(d => {
      drawer = d;

      console.info("Carregado labirinto: ", drawer);
      drawer.generateStepsAndDraw();
    });
  }, [mazeName, player]);

  useEffect(() => {
    options.waitTime = waitTime;
  }, [waitTime]);

  return (
    <main className="flex min-h-screen flex-row items-center justify-between p-24">
      <section id="canvasSection"></section>
      <div className="mb-32 flex flex-col text-center lg:mb-0 lg:text-left">
        <div className="actions group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <div className="sm:col-span-3">
            <label className="block text-sm font-medium leading-6 text-gray-900">Passo atual: {currentIndex}</label>
          </div>
          <div className="sm:col-span-3">
            <label className="block text-sm font-medium leading-6 text-gray-900">X atual: {currentStep?.x}</label>
            <label className="block text-sm font-medium leading-6 text-gray-900">Y atual: {currentStep?.y}</label>
            {currentStep instanceof StepWithDirection
              ? <label className="block text-sm font-medium leading-6 text-gray-900">Sentido atual: {currentStep?.direction}</label>
              : null}
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="waitTime" className="block text-sm font-medium leading-6 text-gray-900">Intervalo entre desenhos</label>
            <div className="mt-2">
              <input type="number" name="waitTime" id="waitTime" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={waitTime} placeholder="tempo em ms" onChange={e => setWaitTime(Number(e?.target?.value) || waitTime)} />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="maze" className="block text-sm font-medium leading-6 text-gray-900">Labirintos</label>
            <div className="mt-2">
              <select name="maze" id="maze" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={mazeName} placeholder="tempo em ms" onChange={e => setMazeName(e.target.value)} >
                <option value="labirinto">labirinto</option>
                <option value="labirinto1">labirinto1</option>
                <option value="labirinto2">labirinto2</option>
                <option value="labirinto3">labirinto3</option>
                <option value="labirinto4">labirinto4</option>
                <option value="labirintogrande">labirintogrande</option>
              </select>
            </div>
          </div>
        </div>
        <button
          onClick={() => { setPlayer(Players.LOTERIA) }}
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Loteria{' '}
            <img src="./b9.jpg" className="h-8 w-8 inline-block" />
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Tira na sorte o proximo passo de 0-4.
          </p>
        </button>
        <button
          onClick={() => { setPlayer(Players.C3PO) }}
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            C3PO{" "}
            <img src="./C3PO.jpg" className="h-8 w-8 inline-block" />
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Gira para esquerda se não tiver parede a direita, caso contrario, gira para direita.
          </p>
        </button>
        <button
          onClick={() => { setPlayer(Players.R2D2) }}
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            R2D2{' '}
            <img src="./R2D2.jpg" className="h-8 w-8 inline-block" />
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Sempre anda com a mão esquerda na parede
          </p>
        </button>
        <button
          onClick={() => { setPlayer(Players.WALLE) }}
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Walle{' '}
            <img src="./walle.jpg" className="h-8 w-8 inline-block" />
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Sempre sai do labirinto atraves de um algoritmo de arvore.
          </p>
        </button>
      </div>
    </main>
  )
}
