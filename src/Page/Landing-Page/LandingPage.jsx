import './style.css'
import { NavBar } from '../../global-component/navBar'
import { HeroSection } from "./component/HeroSection"
import { SecondSection } from "./component/SecondSection"
import { SportList } from './component/SportList'
import { MerchantList } from './component/MerchantList'
import { Footer } from '../../global-component/Footer'
import { FilterSport } from './component/FilterSport'


const LandingPage = () => {
    return (
        <div className="overflow-x-hidden">
            <div className="w-screen flex flex-col items-center">
                <div className="lg:w-[928px] xl:w-[1225px] flex justify-between">
                    <div className="w-[1px] h-auto bg-black"></div>
                    <div className="lg:w-[926px] xl:w-[1223px] flex flex-col items-center">
                        <div className='z-20'>
                            <NavBar />
                        </div>
                        <HeroSection />
                        <div className="lg:w-[926px] xl:w-[1223px] h-auto mt-12 bg-[#FFC800] outline-1 flex flex-col items-center">
                            <SecondSection />
                            <SportList />
                            <FilterSport/>
                            <MerchantList />
                        </div>
                    </div>
                    <div className="w-[1px] h-auto bg-black"></div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default LandingPage