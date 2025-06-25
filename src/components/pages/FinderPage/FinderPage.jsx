import { useState, useEffect } from 'react';
import PageContainer from '../../base/contentContainers/PageContainer';
import CardContainer from '../../base/contentContainers/CardContainer';
import mockCompanyInfo from '../../../mocks/companies';

import './FinderPage.css';


export default function FinderPage({ companies, setCompanies, searchQuery, onCompanySelect }) {
  const [isLoading, setIsLoading] = useState(false);

  const fetchCompanies = async (query) => {
    setIsLoading(true);
    try {
      const companiesData = await searchCompaniesByName(query);
      setCompanies(companiesData);
    } catch (error) {
      console.error('Search error:', error);
      setCompanies([mockCompanyInfo])
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = async (companyID) => {
    setIsLoading(true)
    try {
      const companyDetails = await getCompanyById(companyID);
      onCompanySelect(companyDetails);
    } catch (error) {
      console.error('Fetch company error:', error);
      onCompanySelect(mockCompanyInfo)
    }
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) fetchCompanies(searchQuery);
  }, [searchQuery]);

  return (
    <PageContainer>
      <div></div>
      {isLoading ? (
        <div className="loading">Загрузка...</div>
      ) : companies.length > 0 ? (
        <div className="companies-list">
          <h1>Результаты поиска</h1>
          {companies.map((company) => (
            <CompanyCard
              key={company.ID}
              company={company}
              onClick={handleCardClick}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          {searchQuery ? 'Ничего не найдено' : 'Введите запрос для поиска компаний'}
        </div>
      )}
    </PageContainer>
  );
}


function CompanyCard({ company, onClick }) {
  const handleClick = (e) => {
    console.log(company)
    const card = e.currentTarget;
    card.classList.add('click-animation');

    setTimeout(() => {
      card.classList.remove('click-animation');
      onClick(company.ID);
    }, 500);
  };

  return (
    <CardContainer onClick={handleClick}>
      <h3>{company.name}</h3>
      <p>{company.tagline}</p>
    </CardContainer>
  );
}
