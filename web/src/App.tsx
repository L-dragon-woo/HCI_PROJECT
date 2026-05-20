import { useState, useRef } from 'react'
import Header from './components/Header'
import ImageComparison from './components/ImageComparison'
import { Upload } from 'lucide-react'

function App() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="h-full min-h-screen max-w-full min-w-fit bg-gray-50">
      <Header />
      <div className="container mx-auto pt-20">
        <div className="flex w-full flex-col items-center gap-16 px-8 py-16">
          <div className="flex flex-col items-center gap-8">
            <p className="text-center text-6xl font-bold break-keep text-gray-900">
              사진으로 만드는 나만의 컬러링북
            </p>
            <p className="max-w-[720px] text-center text-xl font-medium text-balance break-keep text-gray-500">
              소중한 사진을 업로드하고 색상 수를 지정해보세요. 누구나 쉽게 따라
              칠할 수 있는 번호 기반의 컬러링 도안을 즉시 만들어 드립니다.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="flex w-full items-center justify-center">
              <ImageComparison
                beforeImage="https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1000&auto=format&fit=crop"
                afterImage="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"
              />
            </div>

            <div className="flex w-full items-center justify-center">
              <div
                className="relative flex aspect-4/3 w-full max-w-4xl cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-white shadow-xl transition-all hover:ring-4 hover:ring-blue-500/30"
                onClick={triggerFileInput}
              >
                {!uploadedImage && (
                  <div className="absolute inset-0 border-4 border-dashed border-gray-100" />
                )}
                {uploadedImage ? (
                  <div className="h-full w-full bg-gray-200">
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      className="h-full w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4 px-6 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md">
                      <Upload size={32} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-900">
                        사진 업로드하기
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        클릭하여 컬러링북으로 만들 사진을 선택하세요
                      </p>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
