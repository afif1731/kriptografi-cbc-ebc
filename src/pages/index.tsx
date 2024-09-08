import Layout from '@/components/layout'
import { useState } from 'react'
import { Button, Card, Textarea, Input } from '@material-tailwind/react'

export default function IndexPage() {
  const [isCbc, setIsCbc] = useState(false);
  const [originalText, setOriginalText] = useState<String>('');
  const [ecKey, setEcKey] = useState<Number>();
  const [ecIv, setEcIv] = useState<Number>();

  const toogleCbc = (): undefined => {
    setIsCbc(!isCbc);
  }

  const inputKey = (value: string) => {
    if(Number.isNaN(value)) {
      alert('Key should be number between 0 - 255');
      return;
    }
    const numValue = Number(value);
    if(numValue < 0 || numValue > 255) {
      alert('Key should be number between 0 - 255');
      return;
    }

    setEcKey(numValue);
    return;
  }

  const inputIV = (value: string) => {
    if(Number.isNaN(value)) {
      setEcIv(0);
      alert('Key should be number between 0 - 255');
      return;
    }
    const numValue = Number(value);
    if(numValue < 0 || numValue > 255) {
      setEcIv(0);
      alert('Key should be number between 0 - 255');
      return;
    }

    setEcIv(numValue);
    return;
  }

  return (
    <Layout title="Home">
      <header>
        <nav className='flex flex-nowrap fixed top-0 w-full items-center lg:justify-between justify-center bg-white shadow-md shadow-black/10 px-10 py-3 z-10'>
          <div className='flex flex-col hover:scale-105 duration-300 items-center'>
            <a href='/' className=' text-center text-black font-bold font-montserrat text-xl w-full'>
              Enkripsi | CBC & EBC
            </a>
          </div>
        </nav>
      </header>

      {/* Below here is where I buried the body */}
      <main className='h-screen'>
        <div className='flex flex-col items-center text-center pt-24'>
          <h1 className="text-3xl font-extrabold font-montserrat">Enkripsi</h1>
          <p className='mt-3 text-gray-800 font-medium font-montserrat'>
            Select your encryption method
          </p>
          <Button
          ripple={true}
          size='lg'
          onClick={toogleCbc}
          className='mt-3 hover:scale-105'
          >
            {
              isCbc ? <span>CBC</span> : <span>EBC</span>
            }
          </Button>
        </div>
        <div className='flex flex-col items-center text-left'>
          <Card color='transparent' shadow={false}>
            <form className='mt-4 mb-2 w-96 max-w-screen-lg sm:w-96'>
              <div className='mb-1 flex flex-col gap-3'>
                <p>Input Text</p>
                <Textarea label='input text to chiper' variant='outlined' value={originalText as string} onChange={(e) => setOriginalText(e.target.value)} />
                <p>Key</p>
                <Input label='0 - 255' className='px-2' value={ecKey as number} onChange={(e) => inputKey(e.target.value)}></Input>
                {
                  isCbc &&
                  <>
                    <p>IV</p>
                    <Input label='0 - 255' className='px-2' value={ecIv as number} onChange={(e) => inputIV(e.target.value)}></Input>
                  </>
                }
                <a className='flex' href={`${process.env.NEXT_PUBLIC_BASE_URL}/api/hello`} target='_blank'>
                  <Button className='mt-6' fullWidth>
                    Get Encrypted Message!!
                  </Button>
                </a>
              </div>
            </form>
          </Card>
        </div>
      </main>
    </Layout>
  )
}
