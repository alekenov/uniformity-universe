
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, CheckCircle, Info, Calendar, Clock, MapPin, ShoppingBag } from 'lucide-react';

const DesignSystem = () => {
  const [activeTab, setActiveTab] = useState("colors");
  
  return (
    <div className="container max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-medium tracking-tight mb-2">Дизайн система</h1>
        <p className="text-muted-foreground">
          Документация и примеры компонентов, стилей и элементов пользовательского интерфейса
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-12">
        <TabsList className="w-full mb-8">
          <TabsTrigger value="colors">Цвета</TabsTrigger>
          <TabsTrigger value="typography">Типографика</TabsTrigger>
          <TabsTrigger value="components">Компоненты</TabsTrigger>
          <TabsTrigger value="forms">Формы</TabsTrigger>
          <TabsTrigger value="icons">Иконки</TabsTrigger>
        </TabsList>

        {/* Цветовая палитра */}
        <TabsContent value="colors" className="space-y-8">
          <div>
            <h2 className="text-2xl font-medium mb-4">Основная палитра</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <ColorCard name="Primary" color="bg-primary" textColor="text-primary-foreground" value="--primary" />
              <ColorCard name="Secondary" color="bg-secondary" textColor="text-secondary-foreground" value="--secondary" />
              <ColorCard name="Accent" color="bg-accent" textColor="text-accent-foreground" value="--accent" />
              <ColorCard name="Muted" color="bg-muted" textColor="text-muted-foreground" value="--muted" />
              <ColorCard name="Background" color="bg-background" textColor="text-foreground" value="--background" />
              <ColorCard name="Destructive" color="bg-destructive" textColor="text-destructive-foreground" value="--destructive" />
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="text-2xl font-medium mb-4">Состояния</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <ColorCard name="Success" color="bg-[hsl(var(--success))]" textColor="text-[hsl(var(--success-foreground))]" value="--success" />
              <ColorCard name="Warning" color="bg-[hsl(var(--warning))]" textColor="text-[hsl(var(--warning-foreground))]" value="--warning" />
              <ColorCard name="Info" color="bg-[hsl(var(--info))]" textColor="text-[hsl(var(--info-foreground))]" value="--info" />
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="text-2xl font-medium mb-4">Границы и обводки</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <ColorCard name="Border" color="bg-border" textColor="text-foreground" value="--border" />
              <ColorCard name="Input" color="bg-input" textColor="text-foreground" value="--input" />
              <ColorCard name="Ring" color="bg-ring" textColor="text-foreground" value="--ring" />
            </div>
          </div>
        </TabsContent>

        {/* Типографика */}
        <TabsContent value="typography" className="space-y-8">
          <div>
            <h2 className="text-2xl font-medium mb-4">Размеры заголовков</h2>
            <div className="space-y-4 mb-8">
              <div>
                <h1 className="text-4xl font-medium tracking-tight">Заголовок h1 (text-4xl)</h1>
                <p className="text-sm text-muted-foreground mt-1">Используется для основных заголовков страниц</p>
              </div>
              <div>
                <h2 className="text-3xl font-medium tracking-tight">Заголовок h2 (text-3xl)</h2>
                <p className="text-sm text-muted-foreground mt-1">Для подзаголовков и секций</p>
              </div>
              <div>
                <h3 className="text-2xl font-medium tracking-tight">Заголовок h3 (text-2xl)</h3>
                <p className="text-sm text-muted-foreground mt-1">Для заголовков компонентов и карточек</p>
              </div>
              <div>
                <h4 className="text-xl font-medium tracking-tight">Заголовок h4 (text-xl)</h4>
                <p className="text-sm text-muted-foreground mt-1">Для небольших заголовков</p>
              </div>
              <div>
                <h5 className="text-lg font-medium tracking-tight">Заголовок h5 (text-lg)</h5>
                <p className="text-sm text-muted-foreground mt-1">Для микрозаголовков</p>
              </div>
            </div>

            <Separator className="my-8" />

            <h2 className="text-2xl font-medium mb-4">Текстовые элементы</h2>
            <div className="space-y-4">
              <div>
                <p className="text-base">Основной текст (text-base)</p>
                <p className="text-sm text-muted-foreground mt-1">Используется для большинства текстового контента</p>
              </div>
              <div>
                <p className="text-sm">Текст меньшего размера (text-sm)</p>
                <p className="text-sm text-muted-foreground mt-1">Для второстепенного текста</p>
              </div>
              <div>
                <p className="text-xs">Микротекст (text-xs)</p>
                <p className="text-sm text-muted-foreground mt-1">Для примечаний, подписей и подсказок</p>
              </div>
              <div>
                <p className="text-muted-foreground">Приглушенный текст (text-muted-foreground)</p>
                <p className="text-sm text-muted-foreground mt-1">Для неактивного или второстепенного текста</p>
              </div>
            </div>
            
            <Separator className="my-8" />
            
            <h2 className="text-2xl font-medium mb-4">Веса шрифта</h2>
            <div className="space-y-4">
              <div>
                <p className="font-normal">Обычный текст (font-normal)</p>
                <p className="text-sm text-muted-foreground mt-1">Основной вес для большинства текста</p>
              </div>
              <div>
                <p className="font-medium">Средний вес (font-medium)</p>
                <p className="text-sm text-muted-foreground mt-1">Для выделения и заголовков</p>
              </div>
              <div>
                <p className="font-semibold">Полужирный (font-semibold)</p>
                <p className="text-sm text-muted-foreground mt-1">Для важных элементов</p>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Компоненты */}
        <TabsContent value="components" className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-medium mb-4">Кнопки и варианты</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h2 className="text-2xl font-medium mb-4">Значки (Badge)</h2>
            <div className="flex flex-wrap gap-4">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h2 className="text-2xl font-medium mb-4">Карточки и панели</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Стандартная карточка</CardTitle>
                  <CardDescription>Описание карточки</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Основное содержимое карточки с примером текста.</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="secondary">Отмена</Button>
                  <Button>Продолжить</Button>
                </CardFooter>
              </Card>
              
              <div className="panel">
                <h3 className="text-lg font-medium mb-2">Панель компонент</h3>
                <p className="text-sm mb-4">Стандартная панель с содержимым</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Кнопка</Button>
                  <Button size="sm">Кнопка</Button>
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h2 className="text-2xl font-medium mb-4">Опции доставки</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <div className="delivery-option delivery-option-selected">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium">Сегодня</span>
              </div>
              
              <div className="delivery-option">
                <div className="p-2 bg-secondary rounded-full">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                </div>
                <span className="text-sm">Завтра</span>
              </div>
              
              <div className="delivery-option delivery-option-disabled">
                <div className="p-2 bg-secondary rounded-full">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                </div>
                <span className="text-sm">Послезавтра</span>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h2 className="text-2xl font-medium mb-4">Состояния компонентов</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Индикаторы состояний</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="icon-destructive" />
                    <span>Ошибка</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="icon-success" />
                    <span>Успех</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Info className="icon-info" />
                    <span>Информация</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Примеры анимаций</h3>
                <div className="flex flex-col gap-4">
                  <Button className="hover-scale w-max">Hover Scale</Button>
                  <Button className="active-scale w-max">Active Scale</Button>
                  <div className="fade-in p-4 bg-secondary rounded-lg w-max">Fade In</div>
                  <div className="slide-in p-4 bg-secondary rounded-lg w-max">Slide In</div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Формы */}
        <TabsContent value="forms" className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-medium mb-4">Элементы форм</h2>
              
              <div className="space-y-2">
                <Label htmlFor="input-default">Стандартное поле</Label>
                <Input id="input-default" placeholder="Введите текст" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="input-error">Поле с ошибкой</Label>
                <Input id="input-error" placeholder="Неверный ввод" className="input-error" />
                <p className="form-error">Пожалуйста, проверьте введенные данные</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="input-success">Поле валидное</Label>
                <Input id="input-success" placeholder="Верный формат" className="input-success" />
                <p className="form-success">Данные проверены</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="input-disabled">Неактивное поле</Label>
                <Input id="input-disabled" placeholder="Недоступно" disabled />
                <p className="form-hint">Функция временно недоступна</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-2xl font-medium mb-4">Дополнительные поля</h2>
              
              <div className="space-y-2">
                <Label htmlFor="textarea">Многострочное поле</Label>
                <Textarea id="textarea" placeholder="Введите подробное описание..." />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">Я принимаю условия использования</Label>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Статусные сообщения</h3>
                
                <div className="p-3 rounded-md bg-secondary text-sm flex items-center gap-2">
                  <Info className="icon-sm" />
                  <span>Информационное сообщение</span>
                </div>
                
                <div className="p-3 rounded-md bg-destructive/10 text-sm flex items-center gap-2 text-destructive">
                  <AlertCircle className="icon-sm icon-destructive" />
                  <span>Сообщение об ошибке</span>
                </div>
                
                <div className="p-3 rounded-md bg-[hsl(var(--success))]/10 text-sm flex items-center gap-2 text-[hsl(var(--success))]">
                  <CheckCircle className="icon-sm icon-success" />
                  <span>Успешное действие</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Иконки */}
        <TabsContent value="icons" className="space-y-8">
          <h2 className="text-2xl font-medium mb-4">Система иконок</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6">
            <IconCard icon={<Calendar />} name="Calendar" />
            <IconCard icon={<Clock />} name="Clock" />
            <IconCard icon={<MapPin />} name="MapPin" />
            <IconCard icon={<ShoppingBag />} name="ShoppingBag" />
            <IconCard icon={<AlertCircle />} name="AlertCircle" />
            <IconCard icon={<Info />} name="Info" />
            <IconCard icon={<CheckCircle />} name="CheckCircle" />
          </div>
          
          <Separator className="my-8" />
          
          <div className="space-y-4">
            <h2 className="text-2xl font-medium mb-4">Размеры иконок</h2>
            <div className="flex flex-wrap items-end gap-8">
              <div className="flex flex-col items-center gap-2">
                <Calendar className="icon-sm" />
                <span className="text-xs text-muted-foreground">icon-sm</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Calendar className="icon" />
                <span className="text-xs text-muted-foreground">icon</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Calendar className="icon-lg" />
                <span className="text-xs text-muted-foreground">icon-lg</span>
              </div>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div className="space-y-4">
            <h2 className="text-2xl font-medium mb-4">Цвета иконок</h2>
            <div className="flex flex-wrap gap-8">
              <div className="flex flex-col items-center gap-2">
                <Calendar className="icon" />
                <span className="text-xs text-muted-foreground">Default</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Calendar className="icon-primary" />
                <span className="text-xs text-muted-foreground">Primary</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Calendar className="icon-muted" />
                <span className="text-xs text-muted-foreground">Muted</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Calendar className="icon-destructive" />
                <span className="text-xs text-muted-foreground">Destructive</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Calendar className="icon-success" />
                <span className="text-xs text-muted-foreground">Success</span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Вспомогательный компонент для отображения цветов
const ColorCard = ({ name, color, textColor, value }: { name: string; color: string; textColor: string; value: string }) => (
  <div className="flex flex-col">
    <div className={`h-16 rounded-lg ${color} flex items-center justify-center ${textColor}`}>
      {name}
    </div>
    <div className="mt-1 text-xs text-muted-foreground">{value}</div>
  </div>
);

// Вспомогательный компонент для отображения иконок
const IconCard = ({ icon, name }: { icon: React.ReactNode; name: string }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="p-3 bg-secondary rounded-lg flex items-center justify-center">
      {icon}
    </div>
    <span className="text-xs text-muted-foreground">{name}</span>
  </div>
);

export default DesignSystem;
