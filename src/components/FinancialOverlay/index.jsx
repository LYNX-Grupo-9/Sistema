import { useState } from 'react'
import DownIcon from './icons/chevron-baixo.png'

const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}

const calcularDataVencimento = (dataCobranca) => {
    const dataVencimento = new Date(dataCobranca)
    dataVencimento.setDate(dataVencimento.getDate() + 5)
    return dataVencimento
}

const StatusIcon = ({ status, dataVencimento }) => {
    if (status === 'PAGO') {
        return (
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>
        )
    } else if (status === 'PENDENTE') {
        const hoje = new Date()
        if (dataVencimento < hoje) {
            return (
                <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            )
        } else {
            return (
                <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            )
        }
    }
}

const ParcelaItem = ({ parcela, index, totalParcelas }) => {
    const dataCobranca = new Date(parcela.vencimento)
    const dataVencimento = calcularDataVencimento(parcela.vencimento)

    return (
        <div
            className="p-4 flex justify-between items-center bg-white hover:bg-gray-50"
            style={{ borderTop: index > 0 ? '1px solid #013451' : 'none' }}
        >
            <div className="flex items-center gap-4">
                <span className="font-bold text-[#013451]">{index + 1}/{totalParcelas}</span>
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#013451]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold text-[#013451]">€ {parcela.valor.toFixed(2).replace('.', ',')}</span>
                </div>
                <span className="text-[#013451]">
                    <span className="font-semibold">Cobrança:</span> {formatDate(dataCobranca)}
                </span>
                <span className="text-[#013451]">
                    <span className="font-semibold">Vencimento:</span> {formatDate(dataVencimento)}
                </span>
            </div>
            <StatusIcon status={parcela.status} dataVencimento={dataVencimento} />
        </div>
    )
}

const LancamentoCard = ({ item, isExpanded, onToggle }) => {
    const totalValor = item.parcelas.reduce((acc, parcela) => acc + parcela.valor, 0)

    return (
        <div className="border-2 border-[#013451] rounded-lg overflow-hidden">
            <div
                className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                onClick={onToggle}
            >
                <p className="text-lg font-bold text-[#013451]">{item.titulo}</p>
                <div className='flex gap-3 items-center'>
                    <p className="text-lg font-bold text-[#013451]">€ {totalValor.toFixed(2).replace('.', ',')}</p>
                    <img
                        src={DownIcon}
                        alt=""
                        className='cursor-pointer transition-transform duration-300'
                        style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                </div>
            </div>

            {isExpanded && (
                <div className="border-t-2 border-[#013451]">
                    {item.parcelas.map((parcela, index) => (
                        <ParcelaItem
                            key={parcela.idParcelas}
                            parcela={parcela}
                            index={index}
                            totalParcelas={item.parcelas.length}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

const FinancialIndicatorCard = ({ title, value, gradientFrom, gradientTo }) => {
    return (
        <div className={`h-full w-1/2 bg-gradient-to-r shadow-lg from-[${gradientFrom}] to-[${gradientTo}] rounded-lg p-6 flex flex-col justify-between text-white`}
            style={{
                backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}>
            <h3 className="text-lg font-semibold opacity-90">{title}</h3>
            <p className="text-4xl font-extrabold">€ {value.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
    )
}

export default function FinancialOverlay({ isOpen, onClose }) {
    const [expandedId, setExpandedId] = useState(null)

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id)
    }


    const overlayStyle = {
        height: '100vh',
        width: '60vw',
        backgroundColor: '#00000080',
        position: 'relative',
        left: isOpen ? '0' : '-100%',
        transition: 'left 0.3s ease-in-out',
    }

    const containerStyle = {
        height: '100vh',
        width: '40vw',
        backgroundColor: '#F3F3F3',
        position: 'relative',
        right: isOpen ? '0' : '-100%',
        transition: 'right 0.3s ease-in-out',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        fontFamily: 'Roboto, sans-serif',
    }

    const wrapper = {
        height: '100vh',
        width: '100vw',
        zIndex: 9999,
        position: 'fixed',
        top: 0,
        left: 0,
        display: isOpen ? 'flex' : 'none',
    }

    const lancamento = [
        {
            "idLancamentos": 12,
            "idCliente": 8,
            "idProcesso": 4,
            "titulo": "Pagamento de Honorários - Caso Almeida",
            "parcelas": [
                {
                    "idParcelas": 101,
                    "idLancamento": 12,
                    "valor": 1500.00,
                    "vencimento": "2025-11-10",
                    "status": "PENDENTE"
                },
                {
                    "idParcelas": 102,
                    "idLancamento": 12,
                    "valor": 1500.00,
                    "vencimento": "2025-12-10",
                    "status": "PENDENTE"
                },
                {
                    "idParcelas": 103,
                    "idLancamento": 12,
                    "valor": 1500.00,
                    "vencimento": "2026-01-10",
                    "status": "PAGO"
                }
            ]
        },
        {
            "idLancamentos": 13,
            "idCliente": 11,
            "idProcesso": 7,
            "titulo": "Custas Processuais - Ação Trabalhista",
            "parcelas": [
                {
                    "idParcelas": 201,
                    "idLancamento": 13,
                    "valor": 980.50,
                    "vencimento": "2025-10-25",
                    "status": "PAGO"
                },
                {
                    "idParcelas": 202,
                    "idLancamento": 13,
                    "valor": 980.50,
                    "vencimento": "2025-11-25",
                    "status": "PENDENTE"
                },
                {
                    "idParcelas": 203,
                    "idLancamento": 13,
                    "valor": 980.50,
                    "vencimento": "2025-12-25",
                    "status": "PENDENTE"
                }
            ]
        }

    ]

    // Calcular totais
    const calcularTotais = () => {
        let totalPago = 0
        let totalPendente = 0

        lancamento.forEach(item => {
            item.parcelas.forEach(parcela => {
                if (parcela.status === 'PAGO') {
                    totalPago += parcela.valor
                } else if (parcela.status === 'PENDENTE') {
                    totalPendente += parcela.valor
                }
            })
        })

        return { totalPago, totalPendente }
    }

    const { totalPago, totalPendente } = calcularTotais()

    return (
        <div style={wrapper}>
            <div style={overlayStyle} onClick={onClose}>

            </div>
            <div style={containerStyle}>
                <h1 className="font-extrabold text-3xl text-[#013451]">Financeiro:</h1>
                <div className="w-full h-[1px] bg-[#87939E]"></div>
                <div className="w-full h-32 flex gap-10">
                    <FinancialIndicatorCard
                        title="Total pago:"
                        value={totalPago}
                        gradientFrom="#013451"
                        gradientTo="#3C6A89"
                    />
                    <FinancialIndicatorCard
                        title="Pendente:"
                        value={totalPendente}
                        gradientFrom="#3C6A89"
                        gradientTo="#013451"
                    />
                </div>
                <h1 className="font-extrabold text-3xl text-[#013451]">Lançamentos:</h1>

                {lancamento.map((item) => (
                    <LancamentoCard
                        key={item.idLancamentos}
                        item={item}
                        isExpanded={expandedId === item.idLancamentos}
                        onToggle={() => toggleExpand(item.idLancamentos)}
                    />
                ))}

            </div>
        </div>
    )
}