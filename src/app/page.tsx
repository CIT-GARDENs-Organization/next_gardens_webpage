"use client";
import {useState} from "react";
import useSWR from "swr";
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import TimeSinceRelease from "./components/TimeSinceRelease";
import Radar from "./components/Radar";
import {createClient} from "@/utils/supabase/client";

const supabase = createClient();

// Updated Pass interface
interface Pass {
  id: string;
  satellite_id: string;
  aos_time: string;
  los_time: string;
  aos_azimuth: number | null;
  los_azimuth: number | null;
  max_elevation: number | null;
  tle_id: string | null; // Updated to string | null
}

// データフェッチ用の関数
const fetchTLE = async (tleId: string) => {
  // Ensure tleId is string
  const {data, error} = await supabase.from("tle").select("*").eq("id", tleId);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// データフェッチ用の関数 with transformation
const fetcher = async (): Promise<Pass[]> => {
  // Specify return type
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayISO = today.toISOString();

  const {data, error} = await supabase
    .from("passes")
    .select("*")
    .gte("aos_time", todayISO);

  if (error) {
    throw new Error(error.message);
  }

  // Transform data to ensure tle_id is string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((pass: any) => ({
    ...pass,
    tle_id: pass.tle_id ? pass.tle_id.toString() : null, // Convert to string or null
  }));
};

export default function Home() {
  const {data, error} = useSWR<Pass[]>("passes", fetcher); // Specify the type for SWR
  const [selectedPass, setSelectedPass] = useState<Pass | null>(null); // Type state correctly

  if (error) return <div>Error loading data...</div>;
  if (!data) return <div>Loading...</div>;

  // 特定のsatellite_idでフィルタ
  const filteredData = data.filter(
    (pass) => pass.satellite_id === "9034fe42-ba1b-4f96-af49-8951207e5ece"
  );

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        id="home"
        className="bg-white dark:bg-gray-900 bg-cover bg-center relative py-52"
        style={{backgroundImage: "url('/KSW_52.jpg')"}}
      >
        <div className="absolute inset-0 bg-black opacity-50 dark:opacity-30"></div>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            千葉工業大学 <br />
            高度技術者育成プログラム
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Growing Advanced and Refined space Development <br />
            Engineers in succession and under the satellite
          </p>
        </div>
      </section>

      <TimeSinceRelease />

      {/* Services Section */}
      <section id="services" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            CIT Satellite Passes:
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-black">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                    Satellite
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                    AOS Time
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                    LOS Time
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                    AOS Azimuth
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                    LOS Azimuth
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                    Max Elevation
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((pass) => {
                  const durationMs =
                    new Date(pass.los_time ?? 0).getTime() -
                    new Date(pass.aos_time ?? 0).getTime();
                  const durationMinutes = Math.floor(durationMs / 60000);
                  const durationSeconds = Math.floor(
                    (durationMs % 60000) / 1000
                  );

                  return (
                    <tr
                      key={pass.id}
                      onClick={() => setSelectedPass(pass)}
                      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500"
                    >
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        YOMOGI
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {pass.aos_time
                          ? new Date(pass.aos_time).toLocaleString()
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {pass.los_time
                          ? new Date(pass.los_time).toLocaleString()
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {durationMinutes}m {durationSeconds}s
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {pass.aos_azimuth?.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {pass.los_azimuth?.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {pass.max_elevation?.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Card Section */}
      {selectedPass && (
        <SatelliteDetailsCard
          selectedPass={selectedPass}
          onClose={() => setSelectedPass(null)}
        />
      )}
    </div>
  );
}

function SatelliteDetailsCard({
  selectedPass,
  onClose,
}: {
  selectedPass: Pass;
  onClose: () => void;
}) {
  const {data: tleData, error} = useSWR(selectedPass.tle_id, fetchTLE);

  if (error) return <div>Error loading TLE data...</div>;
  if (!tleData || tleData.length === 0) return <div>Loading...</div>;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <Card className="w-full max-w-3xl bg-neutral-100">
        <CardHeader>
          <CardTitle className="text-black">Satellite Pass Details</CardTitle>
        </CardHeader>
        <CardContent>
          {/* レーダーと情報を左右に分ける */}
          <div className="flex gap-8">
            {/* レーダー（左側） */}
            <div className="pl-8 pt-4 w-1/2">
              <Radar
                maxElevation={selectedPass.max_elevation as number}
                azimuthStart={selectedPass.aos_azimuth as number}
                azimuthEnd={selectedPass.los_azimuth as number}
              />
            </div>
            {/* 情報（右側） */}
            <div className="w-1/2 flex flex-col gap-2">
              <p className="text-black">
                <strong>Satellite:</strong> YOMOGI
              </p>
              <p className="text-black">
                <strong>AOS Time:</strong>{" "}
                {new Date(selectedPass.aos_time).toLocaleString()}
              </p>
              <p className="text-black">
                <strong>LOS Time:</strong>{" "}
                {new Date(selectedPass.los_time).toLocaleString()}
              </p>
              <p className="text-black">
                <strong>AOS Azimuth:</strong>{" "}
                {selectedPass.aos_azimuth?.toFixed(2)}
              </p>
              <p className="text-black">
                <strong>LOS Azimuth:</strong>{" "}
                {selectedPass.los_azimuth?.toFixed(2)}
              </p>
              <p className="text-black">
                <strong>Max Elevation:</strong>{" "}
                {selectedPass.max_elevation?.toFixed(2)}
              </p>
              <p className="text-black">
                <strong>Omnidirectional:</strong>{" "}
                {/* Max Elevationが270~360(0)の時は、守衛前、それ以外の時は駐車場と表示 */}
                {selectedPass.max_elevation && selectedPass.max_elevation >= 270
                  ? "Front guard"
                  : "Parking"}
              </p>
            </div>
          </div>
          {/* Close Button */}
          <div className="mt-4 flex justify-center">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
