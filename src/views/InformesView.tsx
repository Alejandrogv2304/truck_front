import { useQuery} from "@tanstack/react-query";
import { getAllCamionPlacaAndId, getEstadisticasInforme } from "../api/TruckAppAPI";
import { useState } from "react";
import { COLORS } from "../constants/styles";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { InformePDF } from "../components/InformePDF";


export default function InformesView() {

    
    const [selectedMes, setSelectedMes] = useState<string>("");
    const [selectedPlaca, setSelectedPlaca] = useState<string>("");
    const [selectedAño, setSelectedAño] = useState<string>("");
    const [generarInforme, setGenerarInforme] = useState(false);

{/* Query para traer las placas */}

   // Query para obtener los camiones 
    const { data: camionesData } = useQuery({
      queryKey: ['camionesPlaca'],
      queryFn: () => getAllCamionPlacaAndId(),
      enabled: true,
    });

    // Query para obtener los datos del informe
    const { data: datosInforme, isLoading: isLoadingInforme, isError } = useQuery({
      queryKey: ['informe', selectedPlaca, selectedMes, selectedAño],
      queryFn: () => {
        const camionSeleccionado = camionesData?.find((c: any) => c.placa === selectedPlaca);
        const idCamion = camionSeleccionado?.id_camion || 0;
        return getEstadisticasInforme(idCamion, Number(selectedMes), Number(selectedAño));
      },
      enabled: generarInforme && !!selectedMes && !!selectedAño,
      retry: false,
    });


        // Función para manejar filtrado de informes
  const handleFiltrarGastos = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPlaca || !selectedMes || !selectedAño) {
      alert('Por favor selecciona el camión, mes y año para generar el informe');
      return;
    }
    
    setGenerarInforme(true);
  };

  // Verificar si todos los campos están seleccionados
  const todosLosCamposSeleccionados = selectedPlaca && selectedMes && selectedAño;

  return (
    <>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
        {/* Header Section */}
        <div className="mb-6 md:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
          Informes
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600">
          Genera los informes de tus camiones aquí
        </p>
      </div>

      {/* Filtros para generar informes */}
        <div className="rounded-lg shadow-md w-full border-2 border-slate-200 p-6">
          <div className="mb-4">
            <h1 className="text-xl text-green-900">Filtros para tús informes</h1>
          </div>
          
            <form onSubmit={handleFiltrarGastos} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           <div className="space-y-3 space-x-4">
                              <label
                                htmlFor="idCamion"
                                className="text-lg font-semibold text-green-800 pl-3 mr-4"
                              >
                                Camion
                              </label>
                              <select
                                id="placa"
                                value={selectedPlaca}
                                onChange={(e) => setSelectedPlaca(e.target.value)}
                                className={`border-2 p-2 rounded-lg text-slate-600 w-xs bg-white border-slate-200`}
                              >
                                <option value="">Todos los camiones</option>
                                {camionesData?.map((camion: {id_camion: number, placa: string}) => (
                                  <option key={camion.id_camion} value={camion.placa}>{camion.placa} </option>
                                ))}
                               
                              </select>
                             
                            </div>

                 <div className="space-y-3 space-x-4">
                              <label
                                htmlFor="mes"
                                className="text-lg font-semibold text-green-800 pl-3"
                              >
                                Mes
                              </label>
                              <select
                                id="mes"
                                value={selectedMes}
                                onChange={(e) => setSelectedMes(e.target.value)}
                                className={`border-2 p-2 rounded-lg text-slate-600 w-xs bg-white border-slate-200`}
                              >
                                <option value="">Selecciona un mes</option>
                                <option value={1}>Enero</option>
                                <option value={2}>Febrero</option>
                                <option value={3}>Marzo</option>
                                <option value={4}>Abril</option>
                                <option value={5}>Mayo</option>
                                <option value={6}>Junio</option>
                                <option value={7}>Julio</option>
                                <option value={8}>Agosto</option>
                                <option value={9}>Septiembre</option>
                                <option value={10}>Octubre</option>
                                <option value={11}>Noviembre</option>
                                <option value={12}>Diciembre</option>
                               
                              </select>
                             
                            </div>

                 <div className="space-y-3 space-x-4">
                              <label
                                htmlFor="anio"
                                className="text-lg font-semibold text-green-800 pl-3"
                              >
                                Año
                              </label>
                              <select
                                id="anio"
                                value={selectedAño}
                                onChange={(e) => setSelectedAño(e.target.value)}
                                className={`border-2 p-2 rounded-lg text-slate-600 w-xs bg-white border-slate-200`}
                              >
                                <option value="">Selecciona un año</option>
                                <option value={2025}>2025</option>
                                <option value={2026}>2026</option>
                                <option value={2027}>2027</option>
                                <option value={2028}>2028</option>
                                <option value={2029}>2029</option>
                                <option value={2030}>2030</option>
                                <option value={2031}>2031</option>
                                <option value={2032}>2032</option>
                                <option value={2033}>2033</option>
                                <option value={2034}>2034</option>
                               
                              </select>
                             
                            </div>           
           
         </form>
          <div className={`flex flex-col items-start justify-start gap-4 mt-6`}>
                  <button 
                    onClick={handleFiltrarGastos}
                    type="button"
                    disabled={isLoadingInforme || !todosLosCamposSeleccionados}
                    className={`bg-green-800 ${COLORS["hover"]} cursor-pointer text-white sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 w-3/5 sm:w-auto text-sm sm:text-base shadow-md border-slate-200 border-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isLoadingInforme ? 'Cargando datos...' : 'Generar informe'}
                  </button>

                  {/* Mostrar botón de descarga cuando hay datos */}
                  {datosInforme && !isError && (
                    <PDFDownloadLink
                      document={<InformePDF datos={datosInforme} />}
                      fileName={`Informe_${selectedPlaca || 'Todos'}_${datosInforme.mes}_${datosInforme.anio}.pdf`}
                      className={`bg-blue-600 hover:bg-blue-700 text-white sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 w-3/5 sm:w-auto text-sm sm:text-base shadow-md border-slate-200 border-2 text-center`}
                    >
                      {({ loading }) =>
                        loading ? 'Preparando PDF...' : '📄 Descargar PDF'
                      }
                    </PDFDownloadLink>
                  )}

                  {/* Mostrar error si no hay datos */}
                  {isError && (
                    <div className="text-red-600 text-sm">
                      No se encontraron datos para el período seleccionado
                    </div>
                  )}

                  {/* Mostrar resumen de datos */}
                  {datosInforme && !isError && (
                    <div className="w-full mt-4 p-4 bg-green-50 rounded-lg border-2 border-green-200">
                      <h3 className="text-lg font-semibold text-green-900 mb-3">
                        Vista previa del informe
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Total de viajes</p>
                          <p className="text-xl font-bold text-gray-800">{datosInforme.total_viajes}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Ingresos totales</p>
                          <p className="text-xl font-bold text-green-600">
                            ${datosInforme.ingresos_totales.toLocaleString('es-CO')}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Egresos totales</p>
                          <p className="text-xl font-bold text-red-600">
                            ${datosInforme.egresos_totales.toLocaleString('es-CO')}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Balance total</p>
                          <p className={`text-xl font-bold ${datosInforme.balance_total >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ${datosInforme.balance_total.toLocaleString('es-CO')}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                     
                  </div>
        </div>
    </div>
    </>
  )
}
